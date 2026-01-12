export default function RandomText(props){
    return(
        <p className={`${props.boxShadow ? 'shadow-sm' : ''} ${props.borderRadius ? 'rounded-5' : 'rounded-3'} m-0 d-flex align-items-center gap-2 py-2 px-4`} style={{backgroundColor: props.backgroundColor, fontSize: '14px', color: props.textColor}}>
            <div className={`${props.borderRadius ? '' : 'd-flex align-items-center justify-content-center rounded-circle'}`} style={props.borderRadius ? {} : {width: '30px', height: '30px', backgroundColor: '#EDEFFD'}}>
                {props.icon}
            </div>
            {props.text}
        </p>
    )
}