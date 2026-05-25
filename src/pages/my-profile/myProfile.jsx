import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import { MailDownload01Icon, MailUpload01Icon, Payment02Icon, RealEstate01Icon, ShoppingBasket01Icon, UserCircleIcon } from "hugeicons-react";
import { useEffect } from "react";
import { getDataFromStorage } from "../../utils/storage";

export default function MyProfile(){

    const myProfileRoutes = [
        {
            name: 'Minha conta',
            url : '/my-profile',
            icon: UserCircleIcon
        },
        {
            name: 'Meus imóveis',
            url: 'my-properties',
            icon: RealEstate01Icon
        },
        {
            name: 'Minhas Propostas',
            url: 'my-proposals',
            icon: MailUpload01Icon
        },
        {
            name: 'Propostas Recebidas',
            url: 'received-proposals',
            icon: MailDownload01Icon
        },
        {
            name: 'Meus Pagamentos',
            url: 'my-payments',
            icon: Payment02Icon
        },
        {
            name: 'Histórico de compras',
            url: 'purchase-history',
            icon: ShoppingBasket01Icon
        },
    ]

    const user = localStorage.getItem('user');
    if(!user)
        return <Navigate to={"/"} replace={true} />

    return(
        <>
            <Header />
            <div>
                <Sidebar 
                    routesArray={myProfileRoutes}
                    whatIsThis={'myProfile'}
                />
                <div style={{marginLeft: '280px'}}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}