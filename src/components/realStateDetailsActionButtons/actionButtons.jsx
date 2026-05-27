export default function ActionButtons(props){
    return(
        <button 
            className="btn btn-primary d-flex align-items-center outline-none shadow-none gap-2 py-2 px-3" 
            style={{backgroundColor: props.backgroundColor, color: props.color, border: props.border}} 
            disabled={props.disabled}
            onClick={() => props.onClick? props.onClick() : null}
        >
           {props.icon}
            {props.text}
        </button>
    )
}
