import AdminBreadcrumb from "../../components/adminBreadcrumb/adminBreadcrumb";
import AdminHeader from "../../components/adminHeader/adminHeader";

export default function UsersManagement(){
    return(
        <>
            <AdminHeader page={'Gestão de usuários'} />
            <div
                style={{
                    marginTop: '90px',
                }}
            >
                <div className="px-4">
                    <AdminBreadcrumb page={'Gestão de usuários'} label={'Listagem de usuários'} />
                </div>
                
            </div>
        </>
    )
}