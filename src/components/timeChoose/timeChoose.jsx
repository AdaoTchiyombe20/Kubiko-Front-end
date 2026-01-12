import { useState } from 'react'
import styles from './timeChoose.module.css'
import { useContext } from 'react'
import { AppContext } from '../context/appcontext'
export default function TimeChoose(){
    
    var {isLogged} = useContext(AppContext)
    var horarios = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']
    var [selecionado, setSelecionado] = useState('')
    return(
        <div className={`${styles.timeChooseContainer} d-flex justify-content-between flex-wrap my-3`} style={{gap: '10px 0'}}>
            {
                horarios.map((horario) =>(
                    <button className={`${selecionado == horario ? styles.active : ''} border border-0 rounded-5`} disabled={!isLogged} onClick={() => setSelecionado(horario)}>
                        {horario}
                    </button>
                ))
            }
        </div>
    )
}