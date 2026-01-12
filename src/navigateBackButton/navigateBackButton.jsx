import { useContext } from 'react'
import { AppContext } from '../components/context/appcontext'

export default function BackButton(props){
    const {setShowLocalModal} = useContext(AppContext)
    return(
        <div className='d-flex align-items-center gap-2 mb-3' style={{cursor: 'pointer', width: 'min-content'}} onClick={() => props.onClick()}>
            {props.icon}
            <p className='m-0'>Voltar</p>      
        </div>
    )
}