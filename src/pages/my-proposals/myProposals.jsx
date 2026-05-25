import { Calendar04Icon, Location09Icon } from "hugeicons-react";
import house from "../../assets/imgs/house.png"
import { useEffect, useState } from "react";
export default function MyProposals(){

    return(
        <div
            className="px-4"
            style={{
                marginTop: '95px'
            }}
        >
            <h1 className="fw-semibold m-0 text-default-color">Minhas Propostas</h1>
            <p className="text-secondary m-0">Acompanhe o estado das propostas que você enviou</p>

            <div className="mt-4">
                <div className="d-flex gap-3 border p-4 rounded-3 shadow-sm">
                    <div
                        style={{
                            width: '340px',
                            height: '200px'
                        }}
                    >
                        <img 
                            src={house}
                            alt=""
                            className="object-fit-cover w-100 h-100 rounded-2"
                        />
                    </div>
                    <div 
                        className="d-flex justify-content-between gap-2 px-3 pt-4"
                        style={{
                            width: '74%'
                        }}
                    >
                        <div className="d-flex flex-column gap-3">
                            <div>
                                <h3 className="m-0 fw-semibold mb-2 text-default-color">Apartamento T3 Moderno</h3>
                                <p className="text-secondary m-0 d-flex align-items-center gap-2"><span><Location09Icon /></span> Tatatona, Luanda</p>
                            </div>
                            <p className="text-secondary m-0 d-flex align-items-center gap-2"><span><Calendar04Icon /></span> Enviada em: {new Date().toLocaleString('pt-PT')}</p>
                        </div>
                        <div>
                            <p className="m-0 fs-5 fw-semibold text-default-color">78.000,00kz</p>
                            <p className="text-secondary m-0 d-flex align-items-center gap-2">Valor da Proposta</p>
                        </div>
                        <div className="d-flex flex-column gap-4 w-25">
                            <p
                                className="d-flex justify-content-center text-warning fw-semibold rounded-2 border-0 py-2 m-0"
                                style={{
                                    backgroundColor: '#FCF3D5'
                                }}
                            >
                                Pendente
                            </p>
                            <button
                                className="btn btn-outline-dark text-default-color fw-semibold border py-2 shadow-sm"
                            >
                                Ver Detalhes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}