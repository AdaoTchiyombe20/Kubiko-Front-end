import { Outlet } from "react-router-dom";
import { CheckmarkSquare02Icon, CustomerSupportIcon, DashboardSquare02Icon, File02Icon, Notification02Icon, SecurityIcon } from "hugeicons-react";
import Sidebar from "../../components/sidebar/sidebar";

export default function Admin(){

    const adminRoutes = [
        {
            name: 'Página inicial',
            url : '/admin',
            icon: DashboardSquare02Icon
        },
        // {
        //     name: 'Gestão de Colaboradores',
        //     url : '/admin/employee-management',
        //     icon: UserMultiple03Icon
        // },
        {
            name: 'Gestão de usuários',
            url : 'users-management',
            icon: File02Icon
        },
        {
            name: 'Gestão de imóveis',
            url: 'realstate-management',
            icon: Notification02Icon
        },
        {
            name: 'Gestão de pagamentos',
            url: 'payments-management',
            icon: Notification02Icon
        },
    ]

    return(
        <>
            <Sidebar
                routesArray={adminRoutes}
            />
            <div style={{marginLeft: '280px'}}>
                <Outlet />
            </div>
        </>
    )
}