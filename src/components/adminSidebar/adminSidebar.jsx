import { Link } from "react-router-dom";
import logo from '../../assets/imgs/kubiko.png'
import styles from './adminSidebar.module.css'
import { CheckmarkSquare02Icon, CustomerSupportIcon, DashboardSquare02Icon, File02Icon, Notification02Icon, SecurityIcon } from "hugeicons-react";
export default function AdminSidebar(){

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
            url : '/admin/users-management',
            icon: File02Icon
        },
        {
            name: 'Gestão de imóveis',
            url: '/admin/realstate-management',
            icon: Notification02Icon
        },
        {
            name: 'Gestão de pagamentos',
            url: '/admin/payments-management',
            icon: Notification02Icon
        },
    ]

    return(
        <aside
            className='bg-default-color position-fixed top-0 start-0' 
            style={{
                width: '280px',
                height: '100vh',
            }}
        >
            <Link to={'/'} className='d-flex align-items-center py-3'>
                <img src= {logo} alt="TISBOT_Logo" />
            </Link>
            <div className='ps-2 pe-3 mt-4'>
                <ul className={`${styles.sidebar_ul} list-unstyled d-flex flex-column gap-1`}>
                    {
                        adminRoutes.map((route, index) => (
                            console.log(location.pathname, route.url),
                            <li key={index} className={`${location.pathname === route.url ? styles.active : ''} d-flex align-items-center gap-2 lh-lg`}>
                                <route.icon icon={route.icon} color='#ffff' />
                                <Link to={route.url} className='text-decoration-none text-white w-100'>
                                    {route.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}