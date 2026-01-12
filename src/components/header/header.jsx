import Dropdown from "../dropdown/dropdown";
import { FavouriteIcon, UserCircleIcon, UserCircle02Icon, Calendar02Icon, File02Icon, LogoutCircle01Icon } from "hugeicons-react";
import Logo from '../../assets/imgs/kubiko.png'
import styles from './header.module.css'
import { useContext } from "react";
import { AppContext } from "../context/appcontext";
export default function Header(){
    const { setShowLocalModal, handleShowModal, isLogged } = useContext(AppContext)
    return(
        <header className="d-flex align-items-center justify-content-between border">
            <div className="img">
                <img src={Logo} alt=""/>
            </div>
            <nav className="">
                <ul className="list-unstyled d-flex align-items-center m-0 gap-5">
                    <li>
                        <Dropdown title={'Alugar imóveis'}/>
                    </li>
                    <li>
                        <Dropdown title={'Comprar imóveis'}/>
                    </li>
                    <li>
                        <Dropdown title={'Anunciar imóveis'}/>
                    </li>
                    <li style={{fontSize: '14px'}}>
                        Como funciona
                    </li>
                </ul>
            </nav>
            <div className="d-flex align-items-center gap-4 px-3">
                <div className={`${styles.favourites} d-flex align-items-center justify-content-center rounded-2`}>
                    <FavouriteIcon size={18}/>
                    Favoritos
                </div>
                <div className="dropdown" onClick={() => {
                    if(!isLogged){
                        setShowLocalModal('login')
                        handleShowModal()
                    }
                }}>
                    <a className={`${styles.loginDropdown} btn dropdown-toggle d-flex align-items-center p-0 gap-1 border border-0`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <UserCircleIcon size={24} color="#3541A9"/>
                        <div className="d-flex flex-column align-items-start">
                            <a href="#" className="m-0 text-decoration-none">Olá!</a>
                            <a href="#" className="m-0 text-decoration-none fw-semibold">Entrar</a>
                        </div>
                    </a>
                    <ul className={`${isLogged ? '' : 'd-none'} dropdown-menu border-0 shadow-lg mt-3`}>
                        <li><a className="dropdown-item d-flex align-items-center gap-2 mb-2" href="#"><UserCircle02Icon /> Minha conta</a></li>
                        <li><a className="dropdown-item d-flex align-items-center gap-2 mb-2" href="#"><Calendar02Icon /> Visitas agendadas</a></li>
                        <li><a className="dropdown-item d-flex align-items-center gap-2 mb-2" href="#"><File02Icon /> Histórico</a></li>
                        <li><a className="dropdown-item d-flex align-items-center gap-2 border-top py-3 pb-2" href="#"><LogoutCircle01Icon /> Terminar sessão</a></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}