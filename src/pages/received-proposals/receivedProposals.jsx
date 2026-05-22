import { Calendar04Icon, Location09Icon, StarIcon } from "hugeicons-react";
import { Link, useNavigate } from "react-router-dom";

export default function ReceivedProposals(){

    const navigate = useNavigate()

    return(
        <div
            className="px-4"
            style={{
                marginTop: '95px'
            }}
        >
            <h1 className="fw-semibold m-0 text-default-color">Propostas Recebidas</h1>
            <p className="text-secondary m-0">Veja e responda às propostas enviadas para os seus imóveis</p>

            <div className="mt-4">
                <div className="d-flex justify-content-between gap-2 p-3 py-4 rounded-3 border">
                    <div className="d-flex gap-3 border-end border-1 pe-5">
                        <div 
                            className="d-flex align-items-center justify-content-center rounded-circle text-white bg-default-color mt-1"
                            style={{
                                height: '40px',
                                width: '40px'
                            }}
                        >
                            A
                        </div>
                        <div>
                            <p className="fw-semibold fs-5 m-0 text-default-color">António Da Silva</p>
                            <div className="d-flex gap-1 mb-3">
                                {
                                    [...Array(5)].map(() => (
                                        <StarIcon size={'17'} />
                                    ))
                                }

                            </div>
                            <p className="text-secondary m-0 mb-3">(12 avaliações)</p>
                            <small className="text-secondary">Membro desde Abril 2023</small>
                        </div>
                    </div>
                    <div className="d-flex flex-column gap-3 border-end border-1 pe-5">
                        <div>
                            <p className="text-secondary m-0 mb-2">Imóvel</p>
                            <p className="m-0 fw-semibold fs-5 mb-2 text-default-color">Apartamento T3 Moderno</p>
                            <p className="text-secondary m-0 d-flex align-items-center gap-2"><span><Location09Icon /></span> Tatatona, Luanda</p>
                        </div>
                        <p className="text-secondary m-0 d-flex align-items-center gap-2"><span><Calendar04Icon /></span> Enviada em: {new Date().toLocaleString('pt-PT')}</p>
                    </div>
                    <div className="border-end border-1 pe-5">
                        <p className="text-secondary m-0 mb-2 d-flex align-items-center gap-2">Valor da Proposta</p>
                        <p className="m-0 fs-4 fw-semibold text-default-color">78.000,00kz</p>
                        <p className="text-secondary m-0 gap-2 mt-3"> 
                            Enviada em: <br /> {new Date().toLocaleString('pt-PT')}
                        </p>

                    </div>
                    <div className="d-flex flex-column gap-2 w-25">
                        <p className="text-secondary m-0">Status</p>
                        <p
                            className="d-flex justify-content-center text-warning fw-semibold rounded-2 border-0 py-2 m-0 w-50 mb-2"
                            style={{
                                backgroundColor: '#FCF3D5'
                            }}
                        >
                            Pendente
                        </p>
                        <Link
                            to={'details-proposal/1'}
                            className="btn btn-outline-dark fw-semibold text-default-color border py-2 shadow-sm"
                        >
                            Ver Detalhes
                        </Link>
                        <div className="d-flex align-items-center gap-4">
                            <button className="btn btn-success w-50">
                                Aceitar
                            </button>
                            <button className="btn btn-danger w-50">
                                Recusar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}