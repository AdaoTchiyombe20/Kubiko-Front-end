export default function DetailsItem(props){
    return(
        <div>
            <div className="d-flex gap-1 mb-1">
                {props?.icon}
                <p className="m-0 text-secondary">{props.title}</p>
            </div>
            <p className="m-0">{props.qtd + " " + props.text}</p>
        </div>
    )
}