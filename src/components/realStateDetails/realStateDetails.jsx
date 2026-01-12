import { Bathtub01Icon, BedIcon, Building02Icon, Calendar04Icon, Call02Icon, CheckmarkBadge02Icon, Clock05Icon, KitchenUtensilsIcon, Time04Icon, UserSearch02Icon } from "hugeicons-react";
import Cards from "../cards/cards";
import RandomText from "../randomTextAndSvg/randomText";
import RecentSearchs from "../recentSearchs/recentSearchs";
import DetailsItem from "../detailsItem/detailsItem";
import AdditionalInformation from "../detailsAdditionalInformations/detailsAdditionInformations";
import VariousModal from "../modal/modal";
import ActionButtons from "../realStateDetailsActionButtons/actionButtons";
import styles from './realStateDetails.module.css'
import { useContext } from "react"
import { AppContext } from "../context/appcontext"

export default function RealStateDetails(){

    const {setShowLocalModal, handleShowModal} = useContext(AppContext)

    return(
        <div className={`${styles.realStateDetails}`}>
            <VariousModal />
            <div className="row">
                <div className="col-5">

                </div>
                <div className="col-7">
                    <div>
                        <small className="bg-secondary-subtle px-3 py-1 rounded-5">641653</small>
                        <h2 className="mt-2">Apartamento T1 na Alvalade, ideal para personalizar ao seu gosto</h2>
                    </div>
                    <div className={`${styles.realStatePrice}`}>
                        <p className="fw-semibold text-primary m-0 ">25.650 AOA <span className="text-secondary fw-normal">/mês</span></p>
                        <small>Valor mensal. Pagamento negociável.</small>
                    </div>
                    <div className={`${styles.detailsItem} d-flex gap-4`}>
                        <DetailsItem icon={<BedIcon color="#808080" />} title={"Quarto:"} qtd={"1"} text={"Quarto (1 suite)"} />
                        <DetailsItem icon={<Bathtub01Icon color="#808080" />} title={"Banheiro:"} qtd={"2"} text={"Casas de banho"} />
                        <DetailsItem icon={<Building02Icon color="#808080" />} title={"Edifício:"} qtd={"3"} text={"andares"} />
                        <DetailsItem icon={<KitchenUtensilsIcon color="#808080" />} title={"Cozinha:"} qtd={"1"} text={"cozinha"} />
                    </div>
                    <div className={`${styles.ownerDescription}`}>
                        <div className="lastUpdate d-flex align-items-center gap-1">
                            <Clock05Icon color="#808080" size={20} />
                            <p className="m-0"><span className="text-secondary">Última Atualização: </span>01/01/2026</p>
                        </div>
                        <h2 className="ownerDescriptionTitle fw-semibold">Descrição do proprietário</h2>
                        <p className="ownerDescriptionText text-wrap text-truncate text-secondary m-0">
                            Este apartamento T1 está localizado no bairro da Alvalade, uma das zonas mais procuradas de Luanda, ideal para quem valoriza conforto, segurança e boa mobilidade.
                            O imóvel encontra-se totalmente mobilado, pronto para entrar e morar, com uma sala acolhedora, cozinha equipada e duas casas de banho, oferecendo mais comodidade no dia a dia.
                            Está inserido num prédio organizado, numa zona calma, com fácil acesso a supermercados, escolas, paragens de táxi e vias principais.
                            É uma excelente opção para jovens profissionais, casais ou expatriados que procuram praticidade e qualidade de vida num só lugar.
                        </p>
                    </div>
                    <div className="d-flex gap-2">
                        <AdditionalInformation icon={<CheckmarkBadge02Icon />} text={"Informações confirmadas pelo anunciante"} />
                        <AdditionalInformation icon={<Call02Icon />} text={"Contacto direto com o proprietário"}/>
                        <AdditionalInformation icon={<Time04Icon />} text={"Visitas mediante agendamento"}/>
                    </div>
                    <div className="d-flex align-items-center gap-3 mt-3">
                        <ActionButtons icon={<Calendar04Icon />} text={'Agendar visita'} backgroundColor={'#3541A9'} onClick={() => {
                                setShowLocalModal('scheduleVisit')
                                handleShowModal()
                            }}
                        />
                        <ActionButtons icon={<Call02Icon />} text={'Falar com o anunciante'} color={'#3541A9'} backgroundColor={'#EDEFFD'} />
                    </div>
                </div>
            </div>
            <h2 className="mb-4">Similares na mesma região</h2>
            <div className={`${styles.realStateDetailsContainerCards} container-fluid`}>
                <div className="row mb-4 realStateCards">
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                </div>
            </div>
            <div className="d-flex mb-4">
                <RandomText text='FAÇA PARTE VOCÊ TAMBÉM' textColor={"#D28920"} borderRadius={'rounded-5'} backgroundColor={'#FCF7EA'} icon={<UserSearch02Icon size={16} color="#D28920"/>}/>
            </div>
            <RecentSearchs />
        </div>
    )
}