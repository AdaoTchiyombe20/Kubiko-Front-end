import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/appcontext";
import { UserCircleIcon, UserCircle02Icon, Calendar02Icon, File02Icon, LogoutCircle01Icon } from "hugeicons-react";
import Logo from '../../assets/imgs/kubiko.png'
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from './header.module.css'
import { getDataFromStorage } from "../../utils/storage";
import { logout } from "../../utils/requests";

export default function Header(){
    const { setShowLocalModal, handleShowModal, isLogged } = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false)
    const user = getDataFromStorage('user')

    function handleProtectedNavigation(e){
        if(!getDataFromStorage('user')){
            e.preventDefault()
            setShowMenu(false)
            setShowLocalModal('login')
            handleShowModal()
        }
    }

    function handleLoginClick(){
        if(!isLogged){
            setShowMenu(false)
            setShowLocalModal('login')
            handleShowModal()
        }
    }

    function handleLogout(){
        logout()
        localStorage.removeItem('user')
        setShowMenu(false)
    }

    return(
        <div className="d-flex flex-column">
            <header className={`${styles.header} position-fixed top-0 z-3 w-100 bg-white d-flex align-items-center justify-content-between border-bottom border-1`}>
                <Link to={'/'} className="img">
                    <img src={Logo} alt=""/>
                </Link>
                <nav className="flex-grow-1 d-none d-lg-flex align-items-center justify-content-center">
                    <ul className={`list-unstyled d-flex align-items-center m-0 gap-5 ${styles.ul}`}>
                        <li>
                            <Link 
                                to={'/filters?type_of_purchase=FOR_RENT'} 
                                className="text-decoration-none text-default-color"
                            >
                                Alugar imóveis
                            </Link>
                        </li>
                        <li>
                             <Link 
                                to={'/filters?type_of_purchase=FOR_SALE'} 
                                className="text-decoration-none text-default-color"
                            >
                                Comprar imóveis
                            </Link>
                        </li>
                        <li>
                             <Link 
                                to={'/filters'} 
                                className="text-decoration-none text-default-color"
                                onClick={handleProtectedNavigation}
                            >
                                Destacar imóvel
                            </Link>
                        </li>
                        <li>
                             <Link 
                                to={'/cadastrar-imovel'} 
                                onClick={handleProtectedNavigation}
                                className="text-decoration-none text-default-color"
                            >
                                Cadastrar imóvel
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="d-none d-lg-flex align-items-center gap-4 px-3">
                    <div className="dropdown" onClick={handleLoginClick}>
                        <button className={`${styles.loginDropdown} btn dropdown-toggle d-flex align-items-center p-0 gap-1 border border-0`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <UserCircleIcon size={24} color="#3541A9"/>
                            <div className={`${styles.loginText} d-flex flex-column align-items-start`}>
                                <span className="m-0 text-decoration-none">Olá!</span>
                                <span className="m-0 text-decoration-none text-truncate fw-semibold">{user ? user.email : 'Entrar'}</span>
                            </div>
                        </button>
                        <ul className={`${isLogged ? '' : 'd-none'} dropdown-menu border-0 shadow-lg mt-3`}>
                            <li>
                                <Link 
                                    to={"/my-profile"}
                                    className="dropdown-item d-flex align-items-center gap-2 mb-2"
                                >
                                    <UserCircle02Icon /> Minha conta
                                </Link>
                            </li>
                            <li><a className="dropdown-item d-flex align-items-center gap-2 mb-2" href="#"><Calendar02Icon /> Visitas agendadas</a></li>
                            <li><a className="dropdown-item d-flex align-items-center gap-2 mb-2" href="#"><File02Icon /> Histórico</a></li>
                            <li>
                                <a 
                                    className="dropdown-item d-flex align-items-center gap-2 border-top py-3 pb-2" 
                                    href="#"
                                    onClick={handleLogout}
                                >
                                    <LogoutCircle01Icon />
                                    Terminar sessão
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <button 
                    className={`${styles.menuButton} d-lg-none border-0 bg-transparent shadow-none p-2`}
                    type="button"
                    aria-label="Abrir menu"
                    onClick={() => setShowMenu(true)}
                >
                    <span className={styles.menuIcon}></span>
                </button>
            </header>
            <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="end" className={styles.mobileMenu}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <img src={Logo} alt="Kubiko" className={styles.mobileLogo}/>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <nav>
                        <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
                            <li>
                                <Link to="/filters?type_of_purchase=FOR_RENT" className={styles.mobileNavLink} onClick={() => setShowMenu(false)}>
                                    Alugar imóveis
                                </Link>
                            </li>
                            <li>
                                <Link to="/filters?type_of_purchase=FOR_SALE" className={styles.mobileNavLink} onClick={() => setShowMenu(false)}>
                                    Comprar imóveis
                                </Link>
                            </li>
                            <li>
                                <Link to="/filters" className={styles.mobileNavLink} onClick={handleProtectedNavigation}>
                                    Destacar imóvel
                                </Link>
                            </li>
                            <li>
                                <Link to="/cadastrar-imovel" className={styles.mobileNavLink} onClick={handleProtectedNavigation}>
                                    Cadastrar imóvel
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="border-top pt-4">
                        {
                            user ? (
                                <div className="d-flex flex-column gap-2">
                                    <Link to="/my-profile" className="text-decoration-none text-default-color d-flex align-items-center gap-2 py-2" onClick={() => setShowMenu(false)}>
                                        <UserCircle02Icon /> Minha conta
                                    </Link>
                                    <a className="text-decoration-none text-default-color d-flex align-items-center gap-2 py-2" href="#">
                                        <Calendar02Icon /> Visitas agendadas
                                    </a>
                                    <a className="text-decoration-none text-default-color d-flex align-items-center gap-2 py-2" href="#">
                                        <File02Icon /> Histórico
                                    </a>
                                    <a className="text-decoration-none text-default-color d-flex align-items-center gap-2 border-top mt-2 pt-3" href="#" onClick={handleLogout}>
                                        <LogoutCircle01Icon /> Terminar sessão
                                    </a>
                                </div>
                            ) : (
                                <button className="btn btn-primary bg-default-color border-0 text-white w-100 py-2" type="button" onClick={handleLoginClick}>
                                    Entrar
                                </button>
                            )
                        }
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
