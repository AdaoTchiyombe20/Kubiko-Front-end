import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft02Icon, Bathtub01Icon, BedIcon, Building02Icon, Calendar04Icon, Call02Icon, CheckmarkBadge02Icon, Clock05Icon, KitchenUtensilsIcon, Payment02Icon, Tick03Icon, Time04Icon } from "hugeicons-react"
import DetailsItem from "../detailsItem/detailsItem"
import BackButton from "../../navigateBackButton/navigateBackButton"
import ActionButtons from "../realStateDetailsActionButtons/actionButtons"
import DetailsCarrousel from "../realStateDetailsCarrousel/realStateDetailsCarrousel"
import AdditionalInformation from "../detailsAdditionalInformations/detailsAdditionInformations"
import styles from './realStateDetailsCard.module.css'
import { useContext, useState } from "react"
import { AppContext } from "../context/appcontext"
import { Modal } from "react-bootstrap"
import { TfiLock } from "react-icons/tfi";
import z, { property } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { makeProposal } from "../../utils/requests"
import { getDataFromStorage } from "../../utils/storage"

export default function RealStateDetailsCard({
    whatIsThis, 
    realStateInformations
}){
    const navigate = useNavigate()
    const {setShowLocalModal, openModal} = useContext(AppContext)

    const [isLoading, setIsloading] = useState(false)
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show)
    const [whatModal, setWhatModal] = useState('sendProposal')
    const [proposedPrice, setProposedPrice] = useState(0)
    const lastUpdate = realStateInformations?.updated_at || realStateInformations?.createdAt || realStateInformations?.created_at
    const lastUpdateDate = lastUpdate ? new Date(lastUpdate) : new Date()
    const formattedLastUpdate = Number.isNaN(lastUpdateDate.getTime())
        ? new Date().toLocaleString('pt-PT')
        : lastUpdateDate.toLocaleString('pt-PT')

    const proposalSchema = z.object({
        offer_price: z.string().min(5, 'O preço mínimo é de 25000kz'),
        message: z.string().trim().min(25, 'Descrição muito curta'),
        // months: z.coerce.number({ invalid_type_error: "Valor inválido" }).min(1, "O mínimo é 1 mês"),
    })
    const {
        handleSubmit,
        register,
        reset,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(proposalSchema),
        defaultValues: {
            offer_price: '',
            months: 0
        },
        mode: 'onChange'
    })
    const onSubmit = async (data) => {
        data["property_id"] = realStateInformations.id
        let success = await makeProposal(setIsloading, data)

        if(success !== null){
            setWhatModal("")
            setProposedPrice(Number(data['offer_price']))
        }
    }

    return(
        <div className={`${styles.detailsLayout} row g-4 g-xl-5 align-items-start`}>
            <div className="col-12 col-xl-5">
                {
                    whatIsThis === 'realStateDetails' && (
                        <div className="mb-3">
                            <BackButton icon={<ArrowLeft02Icon />} onClick={() => navigate(-1)} />
                        </div>
                    )
                }
                <div className={styles.detailsMedia}> 
                    <DetailsCarrousel
                    
                        images = {
                            whatIsThis === 'registerProperty' 
                            ? realStateInformations?.images 
                            : realStateInformations?.property_medias
                        }
                        video = {whatIsThis === 'registerProperty' ? realStateInformations?.video : null}
                        whatIsThis={whatIsThis} 
                    />
                </div>
            </div>
            <div className="col-12 col-xl-7">
                {
                    <>
                        <div>
                            {
                                whatIsThis === 'realStateDetails' && (
                                    <small className="bg-secondary-subtle px-3 py-1 rounded-5">641653</small>
                                )
                            }
                            <h2 className={`${styles.detailsTitle} mt-2`}>{realStateInformations?.title || 'Descrição não disponível'}</h2>
                        </div>
                        <div className={`${styles.realStatePrice}`}>
                            <p className="fw-semibold m-0 ">{Number(realStateInformations?.price)?.toLocaleString("pt-AO", {style: 'currency', currency: 'AOA'})} <span className="text-secondary fw-normal">{realStateInformations?.type_property_purchase === 'FOR_RENT' ? '/mês' : ''}</span></p>
                            <small>{realStateInformations?.type_property_purchase === 'FOR_RENT' ? "Valor mensal. Pagamento negociável." : "Valor único. Pagamento à vista."}</small>
                        </div>
                        {/* <div className={`${styles.detailsItem} d-flex gap-4`}>
                            <DetailsItem icon={<BedIcon color="#808080" />} title={"Quarto:"} qtd={realStateInformations?.bedrooms} text={`Quarto (${realStateInformations?.bedrooms} suite)`} />
                            <DetailsItem icon={<Bathtub01Icon color="#808080" />} title={"Banheiro:"} qtd={realStateInformations?.bathrooms} text={"Casas de banho"} />
                            <DetailsItem icon={<Building02Icon color="#808080" />} title={"Edifício:"} qtd={"3"} text={"andares"} /> Posteriormente saber quantos andares tem a residência e tambbém se é de quintal comum
                            <DetailsItem icon={<KitchenUtensilsIcon color="#808080" />} title={"Cozinha:"} qtd={realStateInformations?.kitchen} text={"cozinha"} />
                        </div> */}
                         <div className={`${styles.ownerDescription}`}>
                            <div className="lastUpdate d-flex align-items-center gap-1">
                                <Clock05Icon color="#808080" size={20} />
                                <p className="m-0"><span className="text-secondary">Última Atualização: </span>{formattedLastUpdate}</p>
                            </div>
                            <h2 className="ownerDescriptionTitle fw-semibold">Descrição do proprietário</h2>
                            <p className="ownerDescriptionText text-wrap text-truncate text-secondary m-0">
                                {realStateInformations?.description || 'Descrição não disponível'}
                            </p>
                        </div>
                        <div className={`${styles.additionalInfoList} d-flex gap-2`}>
                            <AdditionalInformation icon={<CheckmarkBadge02Icon />} text={"Informações confirmadas pelo anunciante"} />
                            <AdditionalInformation icon={<Call02Icon />} text={"Contacto direto com o proprietário"}/>
                            <AdditionalInformation icon={<Time04Icon />} text={"Visitas mediante agendamento"}/>
                        </div>
                        {
                            whatIsThis === 'realStateDetails' && (
                                <div className={`${styles.actionButtons} d-flex align-items-center gap-3 mt-3`}>
                                    <ActionButtons 
                                        icon={<Calendar04Icon />} 
                                        text={'Agendar visita'} 
                                        backgroundColor={'#3541A9'} 
                                        border={'none'} 
                                        onClick={() => {
                                            if(!getDataFromStorage('user')){
                                                setShowLocalModal('login')
                                                openModal()
                                                return
                                            }
                                            setShowLocalModal('scheduleVisit')
                                            openModal()
                                        }}
                                    />
                                    <Link
                                        // to={'/payment'}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            if(!getDataFromStorage('user')){
                                                setShowLocalModal('login')
                                                openModal()
                                                return
                                            }
                                            navigate('/payment', {
                                                state: {
                                                    announcedPrice: Number(realStateInformations?.price),
                                                    kubikoTaxPrice: Number(realStateInformations?.price) * 0.05,
                                                    totalPaymentValue: Number(realStateInformations?.price) + (Number(realStateInformations?.price) * 0.05),
                                                    propertyTitle: realStateInformations?.title,
                                                    listed_id: realStateInformations?.listing_id
                                                }
                                            })
                                        }}
                                        className="text-decoration-none btn btn-primary border-0 bg-default-color py-2 gap-2 d-flex justify-content-center align-items-center"
                                    >
                                        <Payment02Icon />
                                        Efectuar pagamento 
                                    </Link>
                                    {
                                        realStateInformations.is_negotiable && (
                                            <ActionButtons 
                                                icon={<Call02Icon />}
                                                text={'Negociar Preço'} 
                                                onClick={()=> {
                                                    if(!getDataFromStorage('user')){
                                                        setShowLocalModal('login')
                                                        openModal()
                                                        return
                                                    } 
                                                    handleShow()
                                                }}
                                                color={'#3541A9'} 
                                                backgroundColor={'#FFFF'} 
                                                border={'1px solid #3541A9'} 
                                            />
                                        )
                                    }
                                    <Modal
                                        show={show} 
                                        onHide={() => {
                                            handleShow()
                                            setWhatModal("sendProposal")
                                        }} 
                                        centered 
                                        size={whatModal === 'sendProposal' ? "xl" : 'lg'}
                                    >
                                        <Modal.Body
                                            className="px-0 py-2"
                                        >
                                        {   
                                            whatModal === 'sendProposal' ?
                                                (
                                                    <div className="row g-4">
                                                        <div className="col-12 col-lg-6 pe-lg-4">
                                                            <div className="mb-3">
                                                                <DetailsCarrousel images = {realStateInformations?.property_medias} whatIsThis={whatModal} />
                                                            </div>
                                                            <h2 className="m-0">{realStateInformations?.title || 'Título não disponível'}</h2>
                                                            <p className="text-secondary m-0 border-bottom border-2 pb-2">{'Talatona, Luanda'}</p>
                                                            <div className="mt-3">
                                                                <div className="pb-2">
                                                                    <p className="text-secondary m-0">Preço anunciado</p>
                                                                    <p className="text-default-color fw-semibold fs-3 m-0">{Number(realStateInformations?.price)?.toLocaleString("pt-AO", {style: 'currency', currency: 'AOA'}) || '85.000,00kz'}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`${styles.proposalFormColumn} col-12 col-lg-6 border-2 ps-lg-4`}>
                                                            <h2 className="fw-semibold">Enviar Proposta ao Proprietário</h2>
                                                            <p className="text-secondary fw-sem">Envie o valor que pretende oferecer pelo imóvel. <br />O proprietário irá analisar e responder directamente pela plataforma</p>
                                                            <form 
                                                                action=""
                                                                onSubmit={handleSubmit(onSubmit)}
                                                            >
                                                                <div className='d-flex flex-column gap-2 w-100 mb-3'>
                                                                    <label htmlFor="" className='ps-1 fw-semibold' >Valor da Proposta (mensal)<span className="text-danger">*</span></label>
                                                                    <input type="number" className="form-control shadow-none outline-none" {...register('offer_price')} placeholder="25.000,00kz" min={25000}/>
                                                                    {errors.offer_price && <p className="text-danger">{errors.offer_price.message}</p>}
                                                                </div>
                                                                <div className='d-flex flex-column gap-2 w-100 mb-3'>
                                                                    <label htmlFor="" className='ps-1 fw-semibold'>Mensagem Opcional</label>
                                                                    <textarea 
                                                                        {...register('message')}
                                                                        id="" 
                                                                        cols="10" 
                                                                        rows="4"
                                                                        className="form-control outline-none shadow-none pt-2"
                                                                        placeholder="Adicione uma mensagem para o proprietário do imóvel"
                                                                        style={{
                                                                            resize: 'none'
                                                                        }}
                                                                    >
                                                                    </textarea>
                                                                    {errors.message && <p className="text-danger">{errors.message.message}</p>
                                                                    }
                                                                </div>
                                                                {/* <div className='d-flex flex-column gap-2 w-100 mb-3'>
                                                                    <label htmlFor="" className='ps-1 fw-semibold'>Meses<span className="text-danger" >*</span></label>
                                                                    <input type="number" {...register('months')} className="form-control shadow-none outline-none" placeholder="6 meses" min={1}/>
                                                                    {errors.months && <p className="text-danger">{errors.months.message}</p>}
                                                                </div> */}
                                                                {/* <div className="d-flex justify-content-between gap-2">
                                                                    <div className="form-floating w-100">
                                                                        <select
                                                                            className="form-select text-secondary cursor-pointer outline-none shadow-none"
                                                                            id="floatingSelectPayment"
                                                                            defaultValue={"0"}
                                                                        >
                                                                            <option value={"0"} hidden disabled>
                                                                                Selecione a forma de pagamento
                                                                            </option>
                                                                            <option value={'Pagamento à vista'}>Pagamento à vista</option>
                                                                            <option value={'Pagamento à vista'}>Transferência Bancária</option>

                                                                        </select>
                                                                        <label
                                                                            className="text-black"
                                                                            htmlFor="floatingSelectPayment"
                                                                        >
                                                                            Forma de Pagamento
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-floating w-100">
                                                                        <select
                                                                            className="form-select text-secondary cursor-pointer outline-none shadow-none"
                                                                            id="floatingSelectMunicipality"
                                                                            defaultValue={"0"}
                                                                        >
                                                                            <option value={"0"} hidden disabled>
                                                                                Selecione o prazo
                                                                            </option>
                                                                            <option value={'Imediato'}>Imediato</option>
                                                                            <option value={'6 meses'}>6 Meses</option>
                                                                        </select>
                                                                        <label
                                                                            className="text-black"
                                                                            htmlFor="floatingSelectMunicipality"
                                                                        >
                                                                            Prazo Pretendido
                                                                        </label>
                                                                    </div>
                                                                </div> */}
                                                                <div className="d-flex align-items-center gap-3 mt-4">
                                                                    <button 
                                                                        className="btn btn-outline-dark"
                                                                        onClick={(e) => {
                                                                            e.preventDefault()
                                                                            handleShow()
                                                                        }}
                                                                        style={{
                                                                            width: '40%'
                                                                        }}
                                                                    >
                                                                        Cancelar
                                                                    </button>
                                                                    <button 
                                                                        type="submit"
                                                                        className="btn btn-primary bg-default-color border-0 shadow-none outline-none"
                                                                        disabled={isLoading}
                                                                        onClick={() => {                                                                       
                                                                            // setWhatModal('sucessProposal')
                                                                        }} 
                                                                        style={{
                                                                            width: '60%'
                                                                        }}
                                                                    >
                                                                        {isLoading ? "Enviando..." : 'Enviar Proposta'}
                                                                    </button>
                                                                </div>
                                                            </form>
                                                            <div className="d-flex mt-3 gap-2">
                                                                <TfiLock className="fw-semibold mt-1"/>
                                                                <p
                                                                    className="text-secondary m-0"
                                                                    style={{
                                                                        fontSize: '13px'
                                                                    }}
                                                                >
                                                                    O proprietário poderá aceitar ou recusar a sua proposta. <br />
                                                                    Todas as negociações são feitas de forma segura dentro da plataforma.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            :
                                                (
                                                    <div>
                                                        <div className="d-flex justify-content-center w-100 mb-3">
                                                            <div
                                                                className="d-flex justify-content-center align-items-center bg-success rounded-circle"
                                                                style={{
                                                                    height: '70px',
                                                                    width: '70px'
                                                                }}
                                                            >
                                                                <Tick03Icon color="white" size={'35'}/>
                                                            </div>
                                                        </div>
                                                        <h2 className="text-center fw-semibold">Proposta enviada com Sucesso</h2>
                                                        <p className="text-secondary m-0 text-center">O proprietário foi notificado e irá responder <br />o mais breve possível</p>
                                                        <div className="border rounded-2 p-3 mt-3">
                                                            <p className="fw-semibold fs-6">Resumo da sua Proposta</p>
                                                            <div className="d-flex flex-column gap-2">
                                                                <div className="d-flex align-items-center justify-content-between">
                                                                    <p className="text-secondary m-0">Imóvel</p>
                                                                    <p className="m-0">{realStateInformations?.title || 'Titulo não disponível'}</p>
                                                                </div>
                                                                <div className="d-flex align-items-center justify-content-between">
                                                                    <p className="text-secondary m-0">Valor da Proposta</p>
                                                                    <p className="m-0">{proposedPrice?.toLocaleString("pt-AO", {style: 'currency', currency: 'AOA'}) || 'Preço não disponível'}</p>
                                                                </div>
                                                                <div className="d-flex align-items-center justify-content-between">
                                                                    <p className="text-secondary m-0">Data de envio</p>
                                                                    <p className="m-0">{new Date().toLocaleString('pt-PT')}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-column gap-2 mt-4">
                                                                <Link
                                                                    to={'/my-profile/my-proposals'}
                                                                    className="d-flex align-items-center justify-content-center rounded-2 text-decoration-none text-light fw-semibold bg-default-color py-2"
                                                                >
                                                                    Ver minhas propostas
                                                                </Link>
                                                                <Link
                                                                    className="d-flex align-items-center justify-content-center rounded-2 text-decoration-none text-dark fw-semibold border-dark border-2 border py-2"
                                                                    onClick={() => {
                                                                        handleShow()
                                                                        setWhatModal('sendProposal')
                                                                        // colocar aqui o reset do RHF pra limpar os form do envio de proposta ...
                                                                    }}
                                                                >
                                                                    Voltar ao imóvel
                                                                </Link>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            )
                        }
                    </>
                }
            </div>
        </div>
    )
}
