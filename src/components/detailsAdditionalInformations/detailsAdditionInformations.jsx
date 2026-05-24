export default function AdditionalInformation(props){
    return(
        <div 
            className="d-flex align-items-center gap-2"
            style={{
                fontSize: '15px'
            }}
        >
            {props.icon}
            {props.text}
        </div>
    )
}