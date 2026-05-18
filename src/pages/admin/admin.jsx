import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/adminSidebar/adminSidebar";

export default function Admin(){
    return(
        <>
            <AdminSidebar />
            <div style={{marginLeft: '280px'}}>
                <Outlet />
            </div>
        </>
    )
}