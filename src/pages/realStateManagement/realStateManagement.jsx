import AdminBreadcrumb from "../../components/adminBreadcrumb/adminBreadcrumb";
import AdminHeader from "../../components/adminHeader/adminHeader";

export default function RealStateManagement(){
    return(
        <>
            <AdminHeader page={'Gestão de Imóveis'}/>
            <div
                style={{
                    marginTop: '90px',
                }}
            >
                <div className="px-4">
                    <AdminBreadcrumb page={'Gestão de imóveis'} label={'Listagem de imóveis'} />
                </div>
                
            </div>
        </>
    )
}