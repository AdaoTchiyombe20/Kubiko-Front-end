// import 'primeicons/primeicons.css';
export default function AdminBreadcrumb({
    page,
    label
}){
    return(
        <div className='d-flex align-items-center gap-2'>
            <p className="m-0 text-default-color">{page}</p>
            <i className="pi pi-circle-fill" style={{ color: '#E2E8F0', fontSize: '5px' }}></i>  
            <p className="text-secondary m-0">{label}</p>
        </div>
    )
}