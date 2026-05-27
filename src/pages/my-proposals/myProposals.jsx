import { Calendar04Icon, Location09Icon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSentProposals } from "../../utils/requests";
import SpinnerLoading from "../../components/spinner/spinner";

const getProposalStatus = (proposal) => (
    proposal?.status ||
    proposal?.negociationEvents?.at?.(-1)?.status ||
    proposal?.negociationEvents?.[0]?.status ||
    'PENDING'
)

const statusStyles = {
    PENDING: { label: 'Pendente', color: '#B7791F', backgroundColor: '#FCF3D5' },
    ACCEPTED: { label: 'Aceite', color: '#18794E', backgroundColor: '#DDF7E8' },
    REJECTED: { label: 'Recusada', color: '#B42318', backgroundColor: '#FDE4E1' },
}

export default function MyProposals(){

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [allProposals, setAllProposals] = useState([])

    useEffect(() => {
        getAllSentProposals(setIsLoading, setAllProposals)
    }, [])

    const goToPayment = (proposal) => {
        const property = proposal?.property_listing?.property
        const listedId = proposal?.property_listing?.id || proposal?.listed_property_id
        const currentStatus = getProposalStatus(proposal)
        const announcedPrice = Number(property?.price || 0)
        const acceptedPrice = Number(proposal?.accepted_value || proposal?.proposed_price || 0)
        const paymentBaseValue = currentStatus === 'ACCEPTED' ? acceptedPrice : announcedPrice
        const kubikoTaxPrice = paymentBaseValue * 0.05

        navigate('/payment', {
            state: {
                announcedPrice,
                paymentBaseValue,
                kubikoTaxPrice,
                totalPaymentValue: paymentBaseValue + kubikoTaxPrice,
                propertyTitle: property?.title,
                listed_id: listedId,
                paymentType: 'DIRECT_PURCHASE',
                paymentContext: currentStatus === 'ACCEPTED' ? 'ACCEPTED_PROPOSAL' : 'ANNOUNCED_PRICE'
            }
        })
    }

    return(
        <div
            className="container-fluid px-3 px-md-4"
            style={{
                marginTop: '95px'
            }}
        >
            <h1 className="fw-semibold m-0 text-default-color">Minhas Propostas</h1>
            <p className="text-secondary m-0">Acompanhe o estado das propostas que você enviou</p>

            <div className="mt-4">
                {
                    isLoading ? (
                        <div className="w-100 d-flex justify-content-center align-items-center" style={{ minHeight: '30vh' }}>
                            <SpinnerLoading width={'5'} height={'5'} />
                        </div>
                    ) : allProposals?.length > 0 ? (
                        allProposals.map((proposal) => {
                            const property = proposal?.property_listing?.property
                            const currentStatus = getProposalStatus(proposal)
                            const status = statusStyles[currentStatus] || statusStyles.PENDING

                            return (
                                <div key={proposal?.id || proposal?.negociationEvents?.[0]?.negociation_id} className="row g-3 align-items-center border p-3 p-md-4 rounded-3 shadow-sm mb-3 bg-white">
                                    <div className="col-12 col-lg-5">
                                        <h3 className="m-0 fw-semibold mb-2 text-default-color fs-5">{property?.title || 'Imóvel sem título'}</h3>
                                        <p className="text-secondary m-0 d-flex align-items-center gap-2"><span><Location09Icon /></span> {property?.location?.municipality || 'Luanda'}, Angola</p>
                                        <p className="text-secondary m-0 d-flex align-items-center gap-2 mt-3"><span><Calendar04Icon /></span> Enviada em: {new Date(proposal?.created_at || Date.now()).toLocaleString('pt-PT')}</p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <p className="m-0 fs-5 fw-semibold text-default-color">{Number(proposal?.proposed_price || 0).toLocaleString('pt-AO', {style: 'currency', currency: 'AOA'})}</p>
                                        <p className="text-secondary m-0">Valor da Proposta</p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-4 d-flex flex-column gap-3">
                                        <p
                                            className="d-flex justify-content-center fw-semibold rounded-2 border-0 py-2 m-0"
                                            style={{
                                                color: status.color,
                                                backgroundColor: status.backgroundColor
                                            }}
                                        >
                                            {status.label}
                                        </p>
                                        <button
                                            className="btn btn-outline-dark text-default-color fw-semibold border py-2 shadow-sm"
                                            onClick={() => navigate(`details-proposal/${proposal?.id || proposal?.negociationEvents?.[0]?.negociation_id || 'detalhes'}`, {
                                                state: { proposal, mode: 'sent' }
                                            })}
                                        >
                                            Ver Detalhes
                                        </button>
                                        <button
                                            className="btn btn-primary bg-default-color border-0 py-2"
                                            disabled={currentStatus === 'PENDING'}
                                            onClick={() => goToPayment(proposal)}
                                        >
                                            {currentStatus === 'ACCEPTED' ? 'Pagar proposta aceite' : currentStatus === 'REJECTED' ? 'Pagar valor anunciado' : 'Aguardando resposta'}
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
                            <h1 className="display-6 text-center fw-semibold text-default-color">Sem propostas enviadas</h1>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
