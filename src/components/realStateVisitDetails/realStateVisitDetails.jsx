export default function VisitDetails(props){
    return(
        <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center gap-1'>
                {props.icon}
                <p className='m-0 text-secondary'>{props.title}</p>
            </div>
            <p className='m-0'> {props.text}</p>
        </div>
    )
}