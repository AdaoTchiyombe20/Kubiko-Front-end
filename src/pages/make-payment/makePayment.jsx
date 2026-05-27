import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { ArrowLeft02Icon, BankIcon, Download04Icon, Pdf02Icon, SecurityCheckIcon, UserIcon } from "hugeicons-react";
import BackButton from "../../navigateBackButton/navigateBackButton";
import Header from "../../components/header/header";
import mcx from "../../assets/imgs/multicaixa_express.png"
import styles from "./makePayment.module.css"
import { toast } from "react-toastify";
import { makePayments } from "../../utils/requests";

export default function MakePayment(){

    const navigate = useNavigate()
    const location = useLocation()

    const {
        announcedPrice,
        kubikoTaxPrice,
        totalPaymentValue,
        propertyTitle,
        listed_id,
        paymentType = 'DIRECT_PURCHASE'
    } = location.state || {}

    const [file, setFile] = useState()
    const [isLoadingPayment, setIsLoadingPayment] = useState(false)

    const { getRootProps, getInputProps} = useDropzone({
        accept: {
            'application/pdf': []
        },
        multiple: false,
        maxFiles: 1,
        maxSize: 1 * 1024 * 1024,
        onDrop: (acceptedFiles) => {

            const uploadedFile = acceptedFiles[0];

            if (!uploadedFile) return;

            setFile(uploadedFile);
        },

        onDropRejected: () => {
            toast.error('Arquivo inválido ou muito grande\nAdicione apenas arquivos PDF com menos de 1MB');
        }
    })
    

    return(
        <div
            style={{
                marginTop: '95px'
            }}
        >
            <Header />
            <div className="px-3 px-md-5 mb-4 mt-2">
                <BackButton
                    icon={<ArrowLeft02Icon />}
                    onClick={() => navigate(-1)}
                />
            </div>
            <div
                className="container-fluid px-3 px-md-5"
            >
                <h2 className="m-0 ps-1">Finalizar o pagamento do imóvel</h2>
                <p className="text-secondary ps-1">Realize o pagamento de forma segura através da plataforma Kubiko</p>
                <div className="container-fluid px-0">
                    <div className="row gx-4 px-0">
                        <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                            <div className="border rounded-4 p-4 pt-3 mb-3">
                                <div className="mb-4">
                                    <p className="fw-semibold fs-4 m-0">
                                        {propertyTitle || 'Imóvel selecionado'}
                                    </p>
                                    <p className="text-secondary m-0">Talatona, Luanda</p>
                                </div>
                                <div>
                                    <div className="d-flex justify-content-between align-items-center border-top border-bottom border-1 py-2">
                                        <p className="text-secondary m-0">Preço Anunciado</p>
                                        <p className="fw-semibold m-0">
                                            {
                                                Number(announcedPrice || 0).toLocaleString("pt-AO", {
                                                    style: 'currency',
                                                    currency: 'AOA'
                                                })
                                            }
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center border-top border-bottom border-1 py-2">
                                        <p className="text-secondary m-0">Taxa da Kubiko (5%)</p>
                                        <p className="fw-semibold m-0">
                                            {Number(kubikoTaxPrice || 0).toLocaleString("pt-AO", {
                                                style: 'currency',
                                                currency: 'AOA'
                                            })}
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center border-top border-1 pt-2">
                                        <p className="fw-semibold text-primary m-0">Valor da Proposta</p>
                                        <p className="m-0 fw-semibold">
                                            {Number(totalPaymentValue || 0).toLocaleString("pt-AO", {
                                                style: 'currency',
                                                currency: 'AOA'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-3 align-items-center p-4 rounded-4 border">
                                <SecurityCheckIcon size={25}/>
                                <div>
                                    <p className="fw-semibold text-primary m-0">Pagamento Protegido pela Kubiko</p>
                                    <p className="text-secondary m-0">O valor ficará retido na plataforma até à assinatura e validaçao do contrato entre ambas as partes</p>
                                </div>
                            </div>
                            <section className={`${styles.dropzone} container col d-flex flex-column align-items-center justify-content-center mt-3 p-0`}>
                                <div 
                                    {...getRootProps({className: 'dropzone d-flex flex-column align-items-center justify-content-center text-center px-3'})}
                                    style={{
                                        width: '100%',
                                        minHeight: file ? '200px' : '170px',
                                        border: '2px dashed #3333c9',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Download04Icon size={38} strokeWidth={'1'}/>
                                    <p className='m-0 mt-2'>Clique para enviar ou arraste o comprovativo aqui</p>
                                    <input 
                                        {...getInputProps()}
                                        className="border"
                                        maxLength={1}
                                    />
                                    {
                                        file && (
                                            <div className="mt-3 d-flex align-items-center gap-2 w-100 justify-content-center">
                                                <Pdf02Icon size={35} className="text-default-color"/>
                                                <div className="d-flex flex-column overflow-hidden">
                                                    <p className="m-0 fw-semibold text-default-color text-truncate">
                                                        {file?.name}
                                                    </p>
                                                    <small className="text-secondary">
                                                        {(file?.size / 1024).toFixed(1)} KB
                                                    </small>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </section>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="mt-2 mb-4">
                                <p className="fw-semibold fs-4 m-0">Método de pagamento</p>
                                <p className="text-secondary m-0">Escolha o método de pagamento e siga as instruções</p>
                            </div>
                            <div className="border rounded-3 p-3 mb-3"> 
                                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
                                    <div className="d-flex gap-3">
                                        <div
                                            style={{
                                                height: '50px',
                                                width: '50px'
                                            }}
                                        >
                                            <img
                                                src={mcx}
                                                alt=""
                                                className="object-fit-cover w-100 h-100 rounded-2"
                                            />
                                        </div>
                                        <div>
                                            <p className="fw-semibold m-0">Multicaixa Express</p>
                                            <p className="text-secondary m-0">Faça a transferência para o número abaixo</p>
                                        </div>
                                    </div>
                                    <p
                                        className="border px-4 py-1 d-flex align-items-center justify-content-center text-default-color fw-semibold rounded-5 border-primary m-0"
                                    >
                                            Recomendado
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-secondary m-0 mb-2 ps-1">Número de telemóvel</p>
                                    <div className="d-flex align-items-center gap-3 border rounded-3 py-2 px-2 flex-wrap">
                                        <div className="px-2 border-end border-2"> 
                                            <UserIcon />
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="m-0 fw-semibold fs-4">923 123 456</p>
                                        </div>
                                        {/* ícone pra copiar pra clicar pra clipboard aqui */}
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex align-items-center justify-content-between mb-2 gap-3">
                                        <p className="m-0 text-secondary">Nome da conta</p>
                                        <p className="m-0 text-secondary">Valor a transferir</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between gap-3">
                                        <p className="m-0 fw-semibold">Kubiko Pagamentos</p>
                                        <p className="m-0 fw-semibold text-end">
                                            {Number(totalPaymentValue || 0).toLocaleString("pt-AO", {
                                                style: 'currency',
                                                currency: 'AOA'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="border rounded-3 p-3 mb-3">
                                <div className="d-flex gap-3 mb-3">
                                    <div className="border rounded-3 d-flex align-items-center justify-content-center px-3 py-3">
                                        <BankIcon />
                                    </div>
                                    <div className="d-flex flex-column">
                                        <p className="fw-semibold m-0">Referência bancária</p>
                                        <p className="text-secondary m-0">Transfira através de referência bancária</p>
                                    </div>
                                </div>
                                <div className="d-flex gap-3 overflow-auto">
                                    <div className="d-flex flex-column gap-2 ps-1">
                                        <p className="text-secondary m-0">Banco</p>
                                        <p className="text-secondary m-0">IBAN</p>
                                        <p className="text-secondary m-0">Referência</p>
                                    </div>
                                    <div className="d-flex flex-column gap-2 ps-1">
                                        <p className="fw-semibold m-0">BAI</p>
                                        <p className="fw-semibold m-0">AO06 0040 0000 1234 5678 9011 2</p>
                                        <p className="fw-semibold m-0">KUB-2024-847291</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex gap-3 align-items-center p-4 rounded-4 border">
                                <SecurityCheckIcon size={25}/>
                                <div>
                                    <p className="fw-semibold text-default-color m-0">Atenção</p>
                                    <p className="text-secondary m-0">Após realizar a transferência, envie o comprovativo para validarmos o seu pagamento</p>
                                </div>
                            </div>
                            </div>
                            <button 
                                className="btn btn-primary bg-default-color border-0 w-100 mt-3 py-2"
                                onClick={async () => {
                                    if(!file){
                                        toast.error("Adicione o comprovativo de pagamento")
                                        return
                                    }

                                    if(!listed_id){
                                        toast.error("Não foi possível identificar o imóvel para pagamento")
                                        return
                                    }

                                    const paymentPayload = {
                                        listed_property_id: listed_id,
                                        paymentType
                                    }
                                    const result = await makePayments(setIsLoadingPayment, paymentPayload)

                                    if(result){
                                        toast.success("Pagamento enviado para validação")
                                        navigate('/my-profile/my-payments')
                                    }
                                }}
                            >
                                {isLoadingPayment ? 'Aguardando' : 'Confirmar pagamento'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
