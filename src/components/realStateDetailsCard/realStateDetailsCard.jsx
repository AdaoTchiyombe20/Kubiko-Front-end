import { useNavigate } from "react-router-dom"
import { ArrowLeft02Icon, Bathtub01Icon, BedIcon, Building02Icon, Calendar04Icon, Call02Icon, CheckmarkBadge02Icon, Clock05Icon, KitchenUtensilsIcon, Time04Icon } from "hugeicons-react"
import DetailsItem from "../detailsItem/detailsItem"
import BackButton from "../../navigateBackButton/navigateBackButton"
import ActionButtons from "../realStateDetailsActionButtons/actionButtons"
import DetailsCarrousel from "../realStateDetailsCarrousel/realStateDetailsCarrousel"
import AdditionalInformation from "../detailsAdditionalInformations/detailsAdditionInformations"
import styles from './realStateDetailsCard.module.css'

export default function RealStateDetailsCard({whatIsThis, realStateInformations}){
    const navigate = useNavigate()
    return(
        <div className="row">
            <div className="col-5">
                {
                    whatIsThis === 'realStateDetails' && (
                        <div className="mb-3">
                            <BackButton icon={<ArrowLeft02Icon />} onClick={() => navigate('/')} />
                        </div>
                    )
                }
                <div>
                    <DetailsCarrousel />
                </div>
            </div>
            <div className="col-7">
                {
                    <>
                        <div>
                            {
                                whatIsThis === 'realStateDetails' && (
                                    <small className="bg-secondary-subtle px-3 py-1 rounded-5">641653</small>
                                )
                            }
                            <h2 className="mt-2">{realStateInformations?.title || 'Descrição não disponível'}</h2>
                        </div>
                        <div className={`${styles.realStatePrice}`}>
                            <p className="fw-semibold m-0 ">{realStateInformations.price?.toLocaleString("pt-AO", {style: 'currency', currency: 'AOA'})} <span className="text-secondary fw-normal">/mês</span></p>
                            <small>Valor mensal. Pagamento negociável.</small>
                        </div>
                        <div className={`${styles.detailsItem} d-flex gap-4`}>
                            <DetailsItem icon={<BedIcon color="#808080" />} title={"Quarto:"} qtd={`${realStateInformations?.bedrooms}`} text={`Quarto (${realStateInformations?.bedrooms} suite)`} />
                            <DetailsItem icon={<Bathtub01Icon color="#808080" />} title={"Banheiro:"} qtd={`${realStateInformations?.bathrooms}`} text={"Casas de banho"} />
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
                                {realStateInformations?.description || 'Descrição não disponível'}
                            </p>
                        </div>
                        <div className="d-flex gap-2">
                            <AdditionalInformation icon={<CheckmarkBadge02Icon />} text={"Informações confirmadas pelo anunciante"} />
                            <AdditionalInformation icon={<Call02Icon />} text={"Contacto direto com o proprietário"}/>
                            <AdditionalInformation icon={<Time04Icon />} text={"Visitas mediante agendamento"}/>
                        </div>
                        {
                            whatIsThis === 'realStateDetails' && (
                                <div className="d-flex align-items-center gap-3 mt-3">
                                    <ActionButtons  icon={<Calendar04Icon />} text={'Agendar visita'} backgroundColor={'#3541A9'} border={'none'} onClick={() => {
                                            setShowLocalModal('scheduleVisit')
                                            handleShowModal()
                                        }}
                                    />
                                    <ActionButtons icon={<Call02Icon />} text={'Falar com o anunciante'} color={'#3541A9'} backgroundColor={'#FFFF'} border={'1px solid #3541A9'} />
                                </div>
                            )
                        }
                    </>
                }
            </div>
        </div>
    )
}