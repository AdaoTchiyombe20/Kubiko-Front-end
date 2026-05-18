export default function AdminIndicatorsCards({
    title,
    value
}){
    return(
        <>
            <div className="col d-flex flex-column gap-3 border rounded-4 p-3">
                <div 
                    className="border rounded-4" 
                    style={{
                        width: '50px',
                        height: '50px',
                    }}
                >
                </div>
                 <div className="mt-3">
                    <p className="m-0 text-secondary">{title}</p>
                    <h2 
                        className='pt-3 fw-semibold'
                        style={{
                            color: '#10265B'
                        }}
                    >
                        {value}
                    </h2>
                </div>
            </div>
        </>
    )
}