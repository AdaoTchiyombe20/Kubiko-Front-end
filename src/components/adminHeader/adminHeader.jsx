import { DashboardSquare02Icon } from "hugeicons-react";

export default function AdminHeader({
    page
}){
    return(
        <header
            className="position-fixed border-bottom border-1 d-flex align-items-center justify-content-between pe-2 ps-4 py-2"
            style={{
                width: 'calc(100% - 280px)',
                height: '70px',
                top: 0,
                left: '280px',
                zIndex: 1000,
                backgroundColor: '#FFFFFF'
            }}
        >
            <div className="d-flex align-items-center gap-2 text-default-color">
                <DashboardSquare02Icon />
                <p className='text-decoration-none m-0'>
                    {page}
                </p>
            </div>
        </header>
    )
}