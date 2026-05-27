import { useEffect, useMemo, useState } from "react";
import { Calendar04Icon, CheckmarkBadge02Icon, FileDownloadIcon, Home09Icon, Wallet02Icon } from "hugeicons-react";
import { getDataFromStorage } from "../../utils/storage";
import { getPayments } from "../../utils/requests";

const formatMoney = (value) => Number(value || 0).toLocaleString("pt-AO", {
    style: "currency",
    currency: "AOA"
})

const statusInfo = {
    PENDING_VALIDATION: {
        label: "Em validação",
        color: "#B7791F",
        backgroundColor: "#FCF3D5"
    },
    APPROVED: {
        label: "Aprovado",
        color: "#18794E",
        backgroundColor: "#DDF7E8"
    },
    REJECTED: {
        label: "Recusado",
        color: "#B42318",
        backgroundColor: "#FDE4E1"
    },
    HELD: {
        label: "Retido",
        color: "#3152C8",
        backgroundColor: "#E8EDFF"
    },
    RELEASED: {
        label: "Liberado",
        color: "#18794E",
        backgroundColor: "#DDF7E8"
    },
    CANCELLED: {
        label: "Cancelado",
        color: "#B42318",
        backgroundColor: "#FDE4E1"
    }
}

const contextLabel = {
    ACCEPTED_PROPOSAL: "Proposta aceite",
    ANNOUNCED_PRICE: "Valor anunciado",
    DIRECT_PURCHASE: "Compra direta"
}

export default function MyPayments(){
    const [payments, setPayments] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function loadPayments(){
            const result = await getPayments(setIsLoading, () => null)
            const apiPayments = result?.payments || result?.data?.payments || []
            const savedPayments = getDataFromStorage("myPayments") || []

            setPayments(apiPayments.length > 0 ? apiPayments : savedPayments)
        }

        loadPayments()
    }, [])

    const totalPaid = useMemo(() => (
        payments.reduce((total, payment) => total + Number(payment.amount || payment.totalPaymentValue || 0), 0)
    ), [payments])

    const getPaymentTitle = (payment) => (
        payment.property_title ||
        payment.propertyTitle ||
        payment.property_listing?.property?.title ||
        'Imóvel selecionado'
    )

    const getPaymentContext = (payment) => (
        payment.negociation_id || payment.negociation
            ? 'Proposta negociada'
            : contextLabel[payment.paymentContext] || contextLabel[payment.payment_type] || 'Compra direta'
    )

    return(
        <div
            className="container-fluid px-3 px-md-4"
            style={{
                marginTop: '105px'
            }}
        >
            <h1 className="fw-semibold m-0 mb-1 text-default-color">Meus Pagamentos</h1>
            <p className="text-secondary m-0">Acompanhe todos os seus pagamentos e o estado de cada transação.</p>

            <div className="row g-3 mt-4">
                <div className="col-12 col-md-4">
                    <div className="border rounded-3 p-3 h-100">
                        <div className="d-flex align-items-center gap-2 text-secondary mb-2">
                            <Wallet02Icon size={20} />
                            <p className="m-0">Total enviado</p>
                        </div>
                        <h3 className="m-0 fw-semibold text-default-color">{formatMoney(totalPaid)}</h3>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="border rounded-3 p-3 h-100">
                        <div className="d-flex align-items-center gap-2 text-secondary mb-2">
                            <FileDownloadIcon size={20} />
                            <p className="m-0">Pagamentos</p>
                        </div>
                        <h3 className="m-0 fw-semibold text-default-color">{payments.length}</h3>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="border rounded-3 p-3 h-100">
                        <div className="d-flex align-items-center gap-2 text-secondary mb-2">
                            <CheckmarkBadge02Icon size={20} />
                            <p className="m-0">Em validação</p>
                        </div>
                        <h3 className="m-0 fw-semibold text-default-color">
                            {payments.filter(payment => ["PENDING_VALIDATION", "HELD"].includes(payment.status)).length}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                {
                    payments.length > 0 ? (
                        payments.map((payment) => {
                            const status = statusInfo[payment.status] || statusInfo.PENDING_VALIDATION
                            const baseValue = Number(payment.property_price || payment.paymentBaseValue || payment.amount || 0)
                            const totalValue = Number(payment.amount || payment.totalPaymentValue || 0)
                            const platformFee = Number(payment.platform_fee || payment.kubikoTaxPrice || 0)
                            const releasedAmount = Number(payment.released_amount || Math.max(totalValue - platformFee, 0))

                            return (
                                <div key={payment.id} className="border rounded-3 shadow-sm p-3 p-md-4 mb-3 bg-white">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-12 col-lg-5">
                                            <div className="d-flex align-items-start gap-3">
                                                <div className="border rounded-3 p-2 d-flex align-items-center justify-content-center flex-shrink-0">
                                                    <Home09Icon />
                                                </div>
                                                <div>
                                                    <h3 className="fs-5 fw-semibold text-default-color m-0">{getPaymentTitle(payment)}</h3>
                                                    <p className="text-secondary m-0 mt-2 d-flex align-items-center gap-2">
                                                        <Calendar04Icon size={18} />
                                                        Pago em {new Date(payment.paid_at || payment.created_at).toLocaleString("pt-PT")}
                                                    </p>
                                                    <small className="text-secondary">Ref: {payment.transaction_reference || payment.id}</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 col-lg-3">
                                            <p className="m-0 text-secondary">Valor base</p>
                                            <p className="m-0 fw-semibold">{formatMoney(baseValue)}</p>
                                            <small className="text-secondary">{getPaymentContext(payment)}</small>
                                        </div>

                                        <div className="col-12 col-md-6 col-lg-2">
                                            <p className="m-0 text-secondary">Total</p>
                                            <p className="m-0 fw-semibold text-default-color">{formatMoney(totalValue)}</p>
                                            <small className="text-secondary">Taxa: {formatMoney(platformFee)}</small>
                                            <br />
                                            <small className="text-secondary">A liberar: {formatMoney(releasedAmount)}</small>
                                        </div>

                                        <div className="col-12 col-lg-2">
                                            <p
                                                className="d-flex justify-content-center fw-semibold rounded-2 py-2 m-0"
                                                style={{
                                                    color: status.color,
                                                    backgroundColor: status.backgroundColor
                                                }}
                                            >
                                                {status.label}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: "48vh" }}>
                            <Wallet02Icon size={48} className="text-secondary mb-3" />
                            <h2 className="fw-semibold text-default-color">Ainda não existem pagamentos</h2>
                            <p className="text-secondary m-0">Quando enviares um comprovativo, o pagamento aparecerá aqui.</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
