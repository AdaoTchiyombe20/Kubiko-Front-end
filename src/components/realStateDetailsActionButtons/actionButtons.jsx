export default function ActionButtons(props){
    return(
        <button className="btn btn-primary border-0 d-flex align-items-center gap-2 py-2 px-3" style={{backgroundColor: props.backgroundColor, color: props.color}} onClick={() => props.onClick()}>
           {props.icon}
            {props.text}
        </button>
    )
}