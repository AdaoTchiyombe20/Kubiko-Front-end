import { ArrowLeft02Icon, Calendar04Icon, Location09Icon, Mail01Icon, UserIcon } from "hugeicons-react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../navigateBackButton/navigateBackButton";

const formatMoney = (value) => Number(value || 0).toLocaleString('pt-AO', {
    style: 'currency',
    currency: 'AOA'
})

const getProposalStatus = (proposal) => (
    proposal?.status ||
    proposal?.negociationEvents?.at?.(-1)?.status ||
    proposal?.negociationEvents?.[0]?.status ||
    'PENDING'
)

export default function ProposalDetails(){
    const navigate = useNavigate()
    const location = useLocation()
    const proposal = location.state?.proposal || {}
    const property = proposal?.property_listing?.property || {}
    const currentStatus = getProposalStatus(proposal)
    const announcedPrice = Number(property?.price || 0)
    const proposedPrice = Number(proposal?.accepted_value || proposal?.proposed_price || 0)
    const paymentBaseValue = currentStatus === 'ACCEPTED' ? proposedPrice : announcedPrice
    const kubikoTaxPrice = paymentBaseValue * 0.05

    const handlePayment = () => {
        navigate('/payment', {
            state: {
                announcedPrice,
                paymentBaseValue,
                kubikoTaxPrice,
                totalPaymentValue: paymentBaseValue + kubikoTaxPrice,
                propertyTitle: property?.title,
                listed_id: proposal?.property_listing?.id || proposal?.listed_property_id,
                paymentType: 'DIRECT_PURCHASE',
                paymentContext: currentStatus === 'ACCEPTED' ? 'ACCEPTED_PROPOSAL' : 'ANNOUNCED_PRICE'
            }
        })
    }

    return(
        <div
            className="container-fluid px-3 px-md-5"
            style={{
                marginTop: '105px'
            }}
        >
            <BackButton icon={<ArrowLeft02Icon />} onClick={() => navigate(-1)} />
            <h2 className="fw-semibold mt-4">Detalhes da Proposta</h2>
            <div className="mt-2 row g-4">
                <div className="col-12 col-lg-6 pt-2">
                    <div className="d-flex gap-3 mb-3">
                        <div
                            className="d-flex align-items-center fs-4 fw-semibold justify-content-center rounded-circle text-white bg-default-color flex-shrink-0"
                            style={{
                                height: '56px',
                                width: '56px'
                            }}
                        >
                            <UserIcon />
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <p className="fw-semibold fs-4 m-0">{proposal?.client?.name || proposal?.user?.name || 'Cliente interessado'}</p>
                            <small className="text-secondary">Proposta enviada pela plataforma Kubiko</small>
                        </div>
                    </div>

                    <p className="fw-semibold">Informações</p>
                    <div className="d-flex flex-column gap-2">
                        <div className="d-flex align-items-center gap-3">
                            <Mail01Icon />
                            <p className="m-0">{proposal?.client?.email || proposal?.user?.email || 'Contacto indisponível'}</p>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <Calendar04Icon />
                            <p className="m-0">Enviada em {new Date(proposal?.created_at || Date.now()).toLocaleString('pt-PT')}</p>
                        </div>
                    </div>

                    <div className="mt-3">
                        <p className="fw-semibold m-0 mb-2">Mensagem do Cliente</p>
                        <div className="p-3 rounded-3 border bg-light">
                            <p className="m-0">{proposal?.message || 'Sem mensagem adicionada.'}</p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="border rounded-4 p-3 p-md-4">
                        <div className="mt-1 mb-4">
                            <p className="fw-semibold fs-4 m-0">{property?.title || 'Imóvel sem título'}</p>
                            <p className="text-secondary m-0 d-flex align-items-center gap-2"><Location09Icon /> {property?.location?.municipality || 'Luanda'}, Angola</p>
                        </div>
                        <div>
                            <div className="d-flex justify-content-between align-items-center border-top border-bottom border-1 py-2 gap-3">
                                <p className="text-secondary m-0">Preço Anunciado</p>
                                <p className="fw-semibold m-0 text-end">{formatMoney(property?.price || proposedPrice)}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-bottom border-1 py-2 gap-3">
                                <p className="text-secondary m-0">Valor da Proposta</p>
                                <p className="fw-semibold text-default-color fs-5 m-0 text-end">{formatMoney(proposedPrice)}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-bottom border-1 py-2 gap-3">
                                <p className="text-secondary m-0">{currentStatus === 'ACCEPTED' ? 'Base do pagamento' : 'Base se pagar agora'}</p>
                                <p className="fw-semibold m-0 text-end">{formatMoney(paymentBaseValue)}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-bottom border-1 py-2 gap-3">
                                <p className="text-secondary m-0">Taxa Kubiko (5%)</p>
                                <p className="fw-semibold m-0 text-end">{formatMoney(kubikoTaxPrice)}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-bottom border-1 py-2 gap-3">
                                <p className="text-secondary m-0">Total a pagar</p>
                                <p className="fw-semibold m-0 text-end">{formatMoney(paymentBaseValue + kubikoTaxPrice)}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center py-2 gap-3">
                                <p className="text-secondary m-0">Forma de Pagamento</p>
                                <p className="fw-semibold m-0 text-end">Pagamento seguro</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                location.state?.mode === 'sent' && (
                    <button className="btn btn-primary bg-default-color border-0 w-100 py-3 mt-4" onClick={handlePayment} disabled={currentStatus === 'PENDING'}>
                        {currentStatus === 'ACCEPTED' ? 'Pagar proposta aceite' : currentStatus === 'REJECTED' ? 'Pagar valor anunciado' : 'Aguardando resposta'}
                    </button>
                )
            }
        </div>
    )
}
