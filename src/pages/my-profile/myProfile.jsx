import { Outlet } from "react-router-dom";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import { MailDownload01Icon, MailUpload01Icon, ShoppingBasket01Icon, UserCircleIcon } from "hugeicons-react";

export default function MyProfile(){

    const myProfileRoutes = [
        {
            name: 'Minha conta',
            url : '/my-profile',
            icon: UserCircleIcon
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
            name: 'Histórico de compras',
            url: 'purchase-history',
            icon: ShoppingBasket01Icon
        },
    ]


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