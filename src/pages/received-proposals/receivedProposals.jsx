import { Calendar04Icon, Location09Icon, StarIcon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { acceptProposal, getAllProposal } from "../../utils/requests";
import SpinnerLoading from "../../components/spinner/spinner";

export default function ReceivedProposals(){

    const navigate = useNavigate()
    const [allProposals, setAllProposals] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingAcceptProposal, setIsLoadingAcceptProposal] = useState(false)
    const [isLoadingRejectProposal, setIsLoadingRejectProposal] = useState(false)

    useEffect(() => {
        getAllProposal(setIsLoading, setAllProposals)
    }, [])

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
                {
                    isLoading ? (
                        <div 
                            className="w-100 d-flex justify-content-center align-items-end"
                            style={{
                                height: '30vh'
                            }}
                        >
                            <SpinnerLoading
                                width={'5'}
                                height={'5'}
                            />
                        </div>
                    ) : (
                        allProposals?.length > 0 ? ( 
                            allProposals.map((proposal) => (
                                <div className="d-flex justify-content-between gap-2 p-3 py-4 rounded-3 border">
                                    <div className="d-flex flex-column w-100 ps-3 gap-3 border-end border-1">
                                        <div>
                                            <p className="text-secondary m-0 mb-2">Imóvel</p>
                                            <p className="m-0 fw-semibold fs-5 mb-2 text-default-color">{proposal.property_listing.property.title}</p>
                                            <p className="text-secondary m-0 d-flex align-items-center gap-2"><span><Location09Icon /></span> Tatatona, Luanda</p>
                                        </div>
                                        <p className="text-secondary m-0 d-flex align-items-center gap-2"><span><Calendar04Icon /></span> Enviada em: {new Date(proposal.created_at).toLocaleString('pt-PT')}</p>
                                    </div>
                                    <div className="border-end border-1  w-100 d-flex flex-column justify-content-center align-items-center">
                                        <p className="text-secondary m-0 mb-2 d-flex align-items-center gap-2">Valor da Proposta</p>
                                        <p className="m-0 fs-4 fw-semibold text-default-color">{Number(proposal?.proposed_price).toLocaleString('pt-AO', {style: 'currency', currency: 'AOA'})}</p>
                                        <p className="text-secondary m-0 gap-2 mt-3"> 
                                            Enviada em: <br /> {new Date(proposal.negociationEvents[0].event_date).toLocaleString('pt-PT')}
                                        </p>

                                    </div>
                                    <div className="d-flex flex-column gap-2 ps-4 pe-3 w-100">
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
                                            <button 
                                                className="btn btn-success w-50"
                                                onClick={(e)=> {
                                                    e.preventDefault()
                                                    acceptProposal(setIsLoadingAcceptProposal, {
                                                        accepted_value: proposal?.proposed_price,
                                                        message: proposal?.message || '',
                                                        negociation_id: proposal?.negociationEvents[0].negociation_id
                                                    })
                                                }}
                                                disabled={isLoadingAcceptProposal}
                                            >
                                                {isLoadingAcceptProposal ? 'Aceitando ...' : 'Aceitar'}
                                            </button>
                                            <button 
                                                className="btn btn-danger w-50"
                                                disabled={isLoadingAcceptProposal}
                                            >
                                                Recusar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    height: '50vh'
                                }}
                            >
                                <h1 className="display-4 text-center mt-5 fw-semibold text-default-color">Sem Resultados</h1>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}