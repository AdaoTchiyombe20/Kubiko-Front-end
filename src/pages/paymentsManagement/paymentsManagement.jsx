import AdminBreadcrumb from "../../components/adminBreadcrumb/adminBreadcrumb";
import AdminHeader from "../../components/adminHeader/adminHeader";

export default function PaymentsManagement(){
    return(
        <>
            <AdminHeader page={'Gestão de Pagamentos'} />
            <div
                style={{
                    marginTop: '90px',
                }}
            >
                <div className="px-4">
                    <AdminBreadcrumb page={'Gestão de Pagamentos'} label={'Listagem de pagamentos'} />
                </div>
                
            </div>
        </>
    )
}