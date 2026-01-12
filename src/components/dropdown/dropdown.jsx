import styles from './dropdown.module.css'
import { ArrowDown01Icon } from 'hugeicons-react'
export default function Dropdown(props){
    return(
        <div className="dropdown">
            <a className={`${styles.dropdown_toggle} btn dropdown-toggle d-flex align-items-center p-0 gap-1 border border-0`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {props.title}
                <ArrowDown01Icon size={18}/>
            </a>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
        </div>
    )
}