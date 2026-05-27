import { Calendar04Icon, Location09Icon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { acceptProposal, getAllProposal, rejectProposal } from "../../utils/requests";
import SpinnerLoading from "../../components/spinner/spinner";

const getProposalStatus = (proposal) => (
    proposal?.status ||
    proposal?.negociationEvents?.[0]?.status ||
    proposal?.negociationEvents?.at?.(-1)?.status ||
    'PENDING'
)

const statusStyles = {
    PENDING: { label: 'Pendente', color: '#B7791F', backgroundColor: '#FCF3D5' },
    ACCEPTED: { label: 'Aceite', color: '#18794E', backgroundColor: '#DDF7E8' },
    REJECTED: { label: 'Recusada', color: '#B42318', backgroundColor: '#FDE4E1' },
}

export default function ReceivedProposals(){

    const navigate = useNavigate()
    const [allProposals, setAllProposals] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [processingProposalId, setProcessingProposalId] = useState(null)

    useEffect(() => {
        getAllProposal(setIsLoading, setAllProposals)
    }, [])

    const handleProposalResponse = async (proposal, action) => {
        const negociationId = proposal?.negociationEvents?.[0]?.negociation_id
        if (!negociationId) return

        setProcessingProposalId(`${action}-${negociationId}`)

        const payload = {
            message: proposal?.message || '',
            negociation_id: negociationId
        }

        const result = action === 'accept'
            ? await acceptProposal(setIsLoading, {
                ...payload,
                accepted_value: proposal?.proposed_price
            })
            : await rejectProposal(setIsLoading, payload)

        setProcessingProposalId(null)

        if (result) {
            getAllProposal(setIsLoading, setAllProposals)
        }
    }

    return(
        <div
            className="container-fluid px-3 px-md-4"
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
                                <div key={proposal?.id || proposal?.negociationEvents?.[0]?.negociation_id} className="row g-3 align-items-stretch p-3 py-4 rounded-3 border mb-3 bg-white">
                                    <div className="col-12 col-lg-5 d-flex flex-column gap-3 border-lg-end">
                                        <div>
                                            <p className="text-secondary m-0 mb-2">Imóvel</p>
                                            <p className="m-0 fw-semibold fs-5 mb-2 text-default-color">{proposal?.property_listing?.property?.title || 'Imóvel sem título'}</p>
                                            <p className="text-secondary m-0 d-flex align-items-center gap-2"><span><Location09Icon /></span> {proposal?.property_listing?.property?.location?.municipality || 'Luanda'}, Angola</p>
                                        </div>
                                        <p className="text-secondary m-0 d-flex align-items-center gap-2"><span><Calendar04Icon /></span> Enviada em: {new Date(proposal.created_at).toLocaleString('pt-PT')}</p>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column justify-content-center align-items-start align-items-lg-center border-lg-end">
                                        <p className="text-secondary m-0 mb-2 d-flex align-items-center gap-2">Valor da Proposta</p>
                                        <p className="m-0 fs-4 fw-semibold text-default-color">{Number(proposal?.proposed_price).toLocaleString('pt-AO', {style: 'currency', currency: 'AOA'})}</p>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4 d-flex flex-column gap-2">
                                        {(() => {
                                            const currentStatus = getProposalStatus(proposal)
                                            const status = statusStyles[currentStatus] || statusStyles.PENDING
                                            const negociationId = proposal?.negociationEvents?.[0]?.negociation_id
                                            const isPending = currentStatus === 'PENDING'

                                            return (
                                                <>
                                        <p className="text-secondary m-0">Status</p>
                                        <p
                                            className="d-flex justify-content-center fw-semibold rounded-2 border-0 py-2 m-0 mb-2"
                                            style={{
                                                color: status.color,
                                                backgroundColor: status.backgroundColor
                                            }}
                                        >
                                            {status.label}
                                        </p>
                                        <Link
                                            to={`details-proposal/${proposal?.id || negociationId || 'detalhes'}`}
                                            state={{ proposal, mode: 'received' }}
                                            className="btn btn-outline-dark fw-semibold text-default-color border py-2 shadow-sm"
                                        >
                                            Ver Detalhes
                                        </Link>
                                        <div className="d-flex align-items-center gap-4">
                                            <button 
                                                className="btn btn-success w-50"
                                                onClick={() => handleProposalResponse(proposal, 'accept')}
                                                disabled={!isPending || processingProposalId === `accept-${negociationId}`}
                                            >
                                                {processingProposalId === `accept-${negociationId}` ? 'Processando' : 'Aceitar'}
                                            </button>
                                            <button 
                                                className="btn btn-danger w-50"
                                                disabled={!isPending || processingProposalId === `reject-${negociationId}`}
                                                onClick={() => handleProposalResponse(proposal, 'reject')}
                                            >
                                                {processingProposalId === `reject-${negociationId}` ? 'Processando' : 'Recusar'}
                                            </button>
                                        </div>
                                                </>
                                            )
                                        })()}
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
