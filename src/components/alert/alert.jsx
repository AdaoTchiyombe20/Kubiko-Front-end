import styles from './alert.module.css'
import { AlertCircleIcon } from 'hugeicons-react'
export default function Alert(){
    return(
        <div className={`${styles.alertContainer} rounded-3`}>
            <div>
                <AlertCircleIcon color='#3541A9' size={26}/>
            </div>
            <div className='d-flex flex-column gap-1'>
                <p className='m-0 fw-semibold'>Você não está logado</p>
                <p className="m-0">Para terminar de agendar a sua visita, precisamos que você faça login ou crie uma conta.</p>
            </div>
        </div>
    )
}