import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { DropdownMenu, Theme } from "@radix-ui/themes";
import { toast } from "react-toastify";
import { CallIcon, Home01Icon, Mail01Icon, MailDownload01Icon, MailUpload01Icon, MoreVerticalIcon, Payment02Icon, StarIcon, UserEdit01Icon } from "hugeicons-react";
import { getAllProposal, getAllSentProposals, getMyProperties } from "../../utils/requests";
import { getDataFromStorage } from "../../utils/storage";
import styles from "../my-profile/account.module.css";

export default function MyProfileHome(){
    const { user, isLoading } = useOutletContext() || {};

    const getInitials = (name) => name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase() || "UK";

    const getUserMediaDocument = (currentUser, type) => (
        currentUser?.profile?.userMidia?.find((media) => media.type === type && media.is_current)?.document_number ||
        currentUser?.profile?.userMidia?.find((media) => media.type === type)?.document_number ||
        ''
    );

    const formatPhone = (phone) => {
        if (!phone) return "Telefone indisponível";
        const normalizedPhone = phone.startsWith("244") ? phone : `244${phone}`;
        return `+${normalizedPhone.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4")}`;
    };

    const formatIban = (iban) => (
        iban ? iban.match(/.{1,4}/g)?.join(" ") : "Conta indisponível"
    );

    const makeProfileFromUser = (currentUser) => {
        const name = currentUser?.profile?.person_profile?.full_name || currentUser?.profile?.company_profile?.company_name || "Usuário Kubiko";
        const phone = getUserMediaDocument(currentUser, "PHONE");
        const bi = getUserMediaDocument(currentUser, "BI");
        const bankAccount = getUserMediaDocument(currentUser, "CONTA_BANCARIA");
        const joinedAt = currentUser?.date_register
            ? new Date(currentUser.date_register).toLocaleDateString("pt-PT")
            : "Hoje";

        return {
            name,
            email: currentUser?.email || "Email indisponível",
            type: currentUser?.profile?.type || "Tipo indisponível",
            status: currentUser?.status || "Estado indisponível",
            roles: currentUser?.profile?.user_role
                ?.filter((userRole) => userRole.status === "APPROVED")
                ?.map((userRole) => userRole.role?.role)
                ?.join(", ") || "Sem funções",
            phone: formatPhone(phone),
            bi: bi || "BI indisponível",
            bankAccount: formatIban(bankAccount),
            birthDate: currentUser?.profile?.person_profile?.birth_date
                ? new Date(currentUser.profile.person_profile.birth_date).toLocaleDateString("pt-PT")
                : "Data indisponível",
            initials: getInitials(name),
            joinedAt
        };
    };

    const [showEditModal, setShowEditModal] = useState(false);
    const [profile, setProfile] = useState(makeProfileFromUser(user));
    const [draftProfile, setDraftProfile] = useState(profile);
    const [summary, setSummary] = useState({
        properties: 0,
        sentProposals: 0,
        receivedProposals: 0,
        payments: 0
    });
    const [isLoadingSummary, setIsLoadingSummary] = useState(true);

    useEffect(() => {
        const nextProfile = makeProfileFromUser(user);
        setProfile(nextProfile);
        setDraftProfile(nextProfile);
    }, [user]);

    useEffect(() => {
        async function loadSummary(){
            setIsLoadingSummary(true);
            const setSilentLoading = () => null;
            const savedPayments = getDataFromStorage("myPayments") || [];

            let myProperties = [];
            let sentProposals = [];
            let receivedProposals = [];

            await getMyProperties(setMyProperties => {
                myProperties = Array.isArray(setMyProperties) ? setMyProperties : [];
            }, setSilentLoading);

            await getAllSentProposals(setSilentLoading, proposals => {
                sentProposals = Array.isArray(proposals) ? proposals : [];
            });

            await getAllProposal(setSilentLoading, proposals => {
                receivedProposals = Array.isArray(proposals) ? proposals : [];
            });

            setSummary({
                properties: myProperties.length,
                sentProposals: sentProposals.length,
                receivedProposals: receivedProposals.length,
                payments: savedPayments.length
            });
            setIsLoadingSummary(false);
        }

        loadSummary();
    }, []);

    if (isLoading || isLoadingSummary) {
        return (
            <div className={`${styles.accountPage} d-flex align-items-center justify-content-center`} style={{ minHeight: "60vh" }}>
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Processando...</span>
                    </div>
                    <p className="text-secondary m-0">Processando...</p>
                </div>
            </div>
        );
    }

    const metrics = [
        { label: "Imóveis anunciados", value: summary.properties, icon: Home01Icon },
        { label: "Propostas enviadas", value: summary.sentProposals, icon: MailUpload01Icon },
        { label: "Propostas recebidas", value: summary.receivedProposals, icon: MailDownload01Icon },
        { label: "Pagamentos", value: summary.payments, icon: Payment02Icon },
    ];

    const handleOpenEditModal = () => {
        setDraftProfile(profile);
        setShowEditModal(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setProfile({
            ...draftProfile,
            initials: draftProfile.name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase() || "CC"
        });
        setShowEditModal(false);
        toast.success("Informações alteradas com sucesso");
    };

    return(
        <div className={styles.accountPage}>
            <section className={`${styles.profileSummary} border rounded-4`}>
                <div className={`${styles.profileSummaryTop} d-flex align-items-center justify-content-between gap-3`}>
                    <div className="d-flex align-items-center gap-3 min-w-0">
                        <span className={`${styles.profileAvatar} d-flex align-items-center justify-content-center rounded-circle`}>
                            {profile.initials}
                        </span>
                        <div className="min-w-0">
                            <p className="text-default-color fw-semibold fs-4 m-0 text-truncate">
                                {profile.name}
                            </p>
                            <p className="text-secondary m-0">Membro desde {profile.joinedAt}</p>
                        </div>
                    </div>
                    <Theme>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <button className={`${styles.iconButton} border rounded-2`} type="button" aria-label="Opções da conta">
                                    <MoreVerticalIcon />
                                </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content className="mt-2">
                                <DropdownMenu.Item
                                    className="text-default-color mb-1"
                                    onClick={handleOpenEditModal}
                                >
                                    <UserEdit01Icon />
                                    Editar informações
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </Theme>
                </div>

                <div className={styles.profileMetrics}>
                    {metrics.map((metric) => (
                        <div key={metric.label} className={`${styles.metricCard} border rounded-3`}>
                            <div className={`${styles.metricIcon} d-flex align-items-center justify-content-center rounded-3`}>
                                <metric.icon size={20} />
                            </div>
                            <div>
                                <p className="text-secondary m-0">{metric.label}</p>
                                <p className="text-default-color fw-semibold fs-4 m-0">{metric.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${styles.profileDetailsGrid} mt-4`}>
                <div className={`${styles.profilePanel} border rounded-4`}>
                    <div className="border-bottom p-4">
                        <h3 className="text-default-color m-0">Informações pessoais</h3>
                    </div>
                    <div className="p-4 d-flex flex-column gap-3">
                        <div className={`${styles.detailLine} d-flex align-items-center justify-content-between`}>
                            <span className="text-secondary d-flex align-items-center gap-2"><UserEdit01Icon size={18} /> Nome</span>
                            <span className="text-default-color fw-semibold">{profile.name}</span>
                        </div>
                        <div className={`${styles.detailLine} d-flex align-items-center justify-content-between`}>
                            <span className="text-secondary d-flex align-items-center gap-2"><Mail01Icon size={18} /> Email</span>
                            <span className="text-default-color fw-semibold">{profile.email}</span>
                        </div>
                        <div className={`${styles.detailLine} d-flex align-items-center justify-content-between`}>
                            <span className="text-secondary d-flex align-items-center gap-2"><UserEdit01Icon size={18} /> Tipo de perfil</span>
                            <span className="text-default-color fw-semibold">{profile.type}</span>
                        </div>
                        <div className={`${styles.detailLine} d-flex align-items-center justify-content-between`}>
                            <span className="text-secondary d-flex align-items-center gap-2"><UserEdit01Icon size={18} /> Estado</span>
                            <span className="text-default-color fw-semibold">{profile.status}</span>
                        </div>
                        <div className={`${styles.detailLine} d-flex align-items-center justify-content-between`}>
                            <span className="text-secondary d-flex align-items-center gap-2"><UserEdit01Icon size={18} /> Funções</span>
                            <span className="text-default-color fw-semibold">{profile.roles}</span>
                        </div>
                        <div className={`${styles.detailLine} d-flex align-items-center justify-content-between`}>
                            <span className="text-secondary d-flex align-items-center gap-2"><CallIcon size={18} /> Telefone</span>
                            <span className="text-default-color fw-semibold">{profile.phone}</span>
                        </div>
                        <div className={`${styles.detailLine} d-flex align-items-center justify-content-between`}>
                            <span className="text-secondary d-flex align-items-center gap-2"><UserEdit01Icon size={18} /> BI</span>
                            <span className="text-default-color fw-semibold">{profile.bi}</span>
                        </div>
                        <div className={`${styles.detailLine} d-flex align-items-center justify-content-between`}>
                            <span className="text-secondary d-flex align-items-center gap-2"><UserEdit01Icon size={18} /> Data de nascimento</span>
                            <span className="text-default-color fw-semibold">{profile.birthDate}</span>
                        </div>
                        <div className={`${styles.detailLine} d-flex align-items-center justify-content-between`}>
                            <span className="text-secondary d-flex align-items-center gap-2"><UserEdit01Icon size={18} /> Conta bancária</span>
                            <span className="text-default-color fw-semibold">{profile.bankAccount}</span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.profilePanel} border rounded-4`}>
                    <div className="border-bottom p-4">
                        <h3 className="text-default-color m-0">Reputação</h3>
                    </div>
                    <div className="p-4">
                        <div className="d-flex align-items-center gap-2 mb-2 text-default-color fw-semibold fs-4">
                            <StarIcon />
                            N/D
                        </div>
                        <p className="text-secondary m-0">Ainda sem avaliações disponíveis.</p>
                    </div>
                </div>
            </section>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar informações</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="d-flex flex-column gap-3">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control shadow-none"
                                    id="profileName"
                                    placeholder="Nome"
                                    value={draftProfile.name}
                                    onChange={(event) => setDraftProfile((prev) => ({...prev, name: event.target.value}))}
                                    required
                                />
                                <label htmlFor="profileName">Nome</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="form-control shadow-none"
                                    id="profileEmail"
                                    placeholder="Email"
                                    value={draftProfile.email}
                                    onChange={(event) => setDraftProfile((prev) => ({...prev, email: event.target.value}))}
                                    required
                                />
                                <label htmlFor="profileEmail">Email</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="tel"
                                    className="form-control shadow-none"
                                    id="profilePhone"
                                    placeholder="Telefone"
                                    value={draftProfile.phone}
                                    onChange={(event) => setDraftProfile((prev) => ({...prev, phone: event.target.value}))}
                                    required
                                />
                                <label htmlFor="profilePhone">Telefone</label>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setShowEditModal(false)}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary bg-default-color border-0">
                            Guardar alterações
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}
