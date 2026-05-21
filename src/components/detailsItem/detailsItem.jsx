export default function DetailsItem(props){
    return(

        <div>
            {
                props.whatIsThis === 'negotiationModal' ? (
                    <div className="d-flex align-items-center gap-3">
                        <div className="d-flex gap-1 mb-1">
                            {props?.icon}
                        </div>
                        <div>
                            <p className="m-0 text-secondary lh-sm">{props.title}</p>
                            <p className="m-0 fw-semibold">{props.qtd || '1'}</p> 
                        </div>
                    </div>
                ) : (
                    <div className="d-flex gap-1 mb-1">
                        {props?.icon}
                        <p className="m-0 text-secondary">{props.title}</p>
                    </div>
                )
            }
            {/* <div className="d-flex gap-1 mb-1">
                {props?.icon}
                <p className="m-0 text-secondary">{props.title}</p>
            </div>
            <p className="m-0">{props.qtd + " " + props.text || ''}</p> */}
        </div>
    )
}