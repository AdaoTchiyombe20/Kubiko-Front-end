import { ArrowLeft02Icon, CallIcon, Mail01Icon, StarIcon } from "hugeicons-react";
import BackButton from "../../navigateBackButton/navigateBackButton";
import house from "../../assets/imgs/house.png"
import { useNavigate } from "react-router-dom";

export default function ProposalDetails(){
    const navigate = useNavigate()
    return(
        <div
            className="px-5"
            style={{
                marginTop: '105px'
            }}
        >
            <BackButton icon={<ArrowLeft02Icon />} onClick={() => navigate(-1)} />
            <h2 className="fw-semibold mt-4">Detalhes da Proposta</h2>
            <div className="mt-2 row">
                <div className="col-6 pt-4">
                    <div className="d-flex gap-3 pe-5 mb-2">
                        <div
                            className="d-flex align-items-center fs-4 fw-semibold justify-content-center rounded-circle text-white bg-default-color mt-2"
                            style={{
                                height: '60px',
                                width: '60px'
                            }}
                        >
                            A
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <p className="fw-semibold fs-4 m-0">António Da Silva</p>
                            <div className="d-flex gap-1">
                                {
                                    [...Array(5)].map(() => (
                                        <StarIcon size={'17'} />
                                    ))
                                }
                            </div>
                            <p className="text-secondary m-0">(12 avaliações)</p>
                            <small className="text-secondary">Membro desde Abril 2023</small>
                        </div>
                    </div>
                    <p className="fw-semibold">Informações de Contacto</p>
                    <div className="d-flex flex-column gap-2">
                        <div className="d-flex align-items-center gap-3">
                            <Mail01Icon />
                            <p className="m-0">claudio.cassoma@teste.com</p>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <CallIcon />
                            <p className="m-0">+244 912 345 678</p>
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="fw-semibold m-0 mb-2">Mensagem do Cliente</p>
                        <div 
                            className="p-3 rounded-3 border"
                            style={{
                                backgroundColor: '#F6F7F9'
                            }}
                        >
                            <p>"Tenho interesse imediato no imóvel e disponibilidade para pagamento ainda este mês"</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 border rounded-4 p-4 py-5">
                    <div
                        style={{
                            height: '250px'
                        }}
                    >
                        <img 
                            src={house}
                            alt=""
                            className="object-fit-cover w-100 h-100 rounded-2"
                        />
                    </div>
                    <div className="mt-3 mb-4">
                        <p className="fw-semibold fs-4 m-0">Apartamento T3 Moderno</p>
                        <p className="text-secondary m-0">Talatona, Luanda</p>
                    </div>
                    <div>
                        <div className="d-flex justify-content-between align-items-center border-top border-bottom border-1 py-2">
                            <p className="text-secondary m-0">Preço Anunciado</p>
                            <p className="fw-semibold m-0">85.000,00kz</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-top border-bottom border-1 py-2">
                            <p className="text-secondary m-0">Valor da Proposta</p>
                            <p className="fw-semibold text-default-color fs-5 m-0">78.000,00kz</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-top border-bottom border-1 py-2">
                            <p className="text-secondary m-0">Enviada em</p>
                            <p className="m-0">{new Date().toLocaleString('pt-PT')}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-top border-bottom border-1 py-2">
                            <p className="text-secondary m-0">Forma de Pagamento</p>
                            <p className="fw-semibold m-0">Pagamento à vista</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-top border-1 py-2">
                            <p className="text-secondary m-0">Prazo Pretendido</p>
                            <p className="fw-semibold m-0">Imediato</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center gap-4 mt-4">
                <button className="btn btn-primary bg-default-color border-0 w-50 py-3">
                    Aceitar
                </button>
                <button className="btn btn-danger w-50 py-3">
                    Recusar
                </button>
            </div>
        </div>
    )
}