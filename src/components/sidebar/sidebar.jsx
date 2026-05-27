import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu07Icon } from "hugeicons-react";
import logo from '../../../public/imgs/logo_white.png'
import styles from './adminSidebar.module.css'
export default function Sidebar({
    routesArray,
    whatIsThis
}){

    const location = useLocation()
    const isMyProfile = location.pathname.startsWith('/my-profile');
    const [isExpanded, setIsExpanded] = useState(false)

    const isActiveRoute = (route) => {
        const routePath = route.url.startsWith('/') ? route.url : `/my-profile/${route.url}`
        return route.url === '/my-profile'
            ? location.pathname === '/my-profile'
            : location.pathname.startsWith(routePath)
    }

    return(
        <aside
            className={`${whatIsThis === 'myProfile' ? `${styles.profileSidebar} ${isExpanded ? styles.profileSidebarExpanded : ''} border-end border` : 'bg-default-color position-fixed top-0 start-0'}`}
            style={whatIsThis === 'myProfile' ? undefined : {
                width: '280px',
                height: '100vh',
            }}
        >
            {
                whatIsThis === 'myProfile' && (
                    <button
                        type="button"
                        className={`${styles.profileSidebarToggle} border`}
                        aria-label={isExpanded ? 'Recolher menu' : 'Expandir menu'}
                        onClick={() => setIsExpanded(prev => !prev)}
                    >
                        <Menu07Icon size={20} />
                    </button>
                )
            }
            <Link 
                to={'/'}
                className={`${styles.profileSidebarLogo} d-flex align-items-center pb-3 ps-3`}
                style={{
                    paddingTop: '19px'
                }}
            >
                <img
                    src= {logo} alt="TISBOT_Logo" 
                    className="object-fit-cover"
                    style={{
                        width: '130px',
                        // height: '40px',
                    }}
                />
            </Link>
            <div className={`${styles.profileSidebarNav} ps-2 pe-3 mt-4`}>
                <ul className={`${styles.sidebar_ul} list-unstyled d-flex flex-column gap-1`}>
                    {
                        routesArray?.map((route, index) => (
                            <li key={index} className={`${whatIsThis === 'myProfile' ? (isActiveRoute(route) ? styles.activeProfile : '') : (location.pathname === `/admin/${route.url}` ? styles.active : '')} d-flex align-items-center gap-2 lh-lg`}>
                                <route.icon icon={route.icon} color={whatIsThis === 'myProfile' ? '#10265B' :  '#ffff'}/>
                                <Link 
                                    to={route.url} 
                                    title={route.name}
                                    className={`${styles.sidebarLabel} text-decoration-none ${whatIsThis === 'myProfile' ? `text-default-color ${styles.active2}` : 'text-white'} w-100`}
                                >
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
