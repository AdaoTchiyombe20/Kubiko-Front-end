import { useState } from "react";
import { Modal } from "react-bootstrap";
import { DropdownMenu, Theme } from "@radix-ui/themes";
import { toast } from "react-toastify";
import { CallIcon, Home01Icon, Mail01Icon, MailDownload01Icon, MailUpload01Icon, MoreVerticalIcon, StarIcon, UserEdit01Icon } from "hugeicons-react";
import styles from "../my-profile/account.module.css";

export default function MyProfileHome(){
    const [showEditModal, setShowEditModal] = useState(false);
    const [profile, setProfile] = useState({
        name: "Cláudio Cassoma",
        email: "claudio.cassoma@teste.com",
        phone: "+244 912 345 678",
        initials: "CC",
        joinedAt: "01/01/2023"
    });
    const [draftProfile, setDraftProfile] = useState(profile);

    const metrics = [
        { label: "Imóveis anunciados", value: "12", icon: Home01Icon },
        { label: "Propostas enviadas", value: "8", icon: MailUpload01Icon },
        { label: "Propostas recebidas", value: "15", icon: MailDownload01Icon },
        { label: "Avaliação média", value: "4.8", icon: StarIcon },
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
                            <span className="text-secondary d-flex align-items-center gap-2"><CallIcon size={18} /> Telefone</span>
                            <span className="text-default-color fw-semibold">{profile.phone}</span>
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
                            4.8
                        </div>
                        <p className="text-secondary m-0">Baseado em 12 avaliações recebidas.</p>
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
