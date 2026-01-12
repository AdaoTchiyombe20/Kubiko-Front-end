export default function AdditionalInformation(props){
    return(
        <div className="d-flex align-items-center gap-2">
            {props.icon}
            {props.text}
        </div>
    )
}