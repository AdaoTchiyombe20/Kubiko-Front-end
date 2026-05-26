import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/appcontext";
import { FavouriteIcon, UserCircleIcon, UserCircle02Icon, Calendar02Icon, File02Icon, LogoutCircle01Icon } from "hugeicons-react";
import Logo from '../../assets/imgs/kubiko.png'
import Dropdown from "../dropdown/dropdown";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from './header.module.css'
import { getDataFromStorage } from "../../utils/storage";
import { logout } from "../../utils/requests";

export default function Header(){
    const { setShowLocalModal, handleShowModal, isLogged } = useContext(AppContext)

    return(
        <div className="d-flex flex-column">
            <header className="position-fixed top-0 z-3 w-100 bg-white d-flex align-items-center justify-content-between border-bottom border-1">
                <Link to={'/'} className="img">
                    <img src={Logo} alt=""/>
                </Link>
                <nav className="flex-grow-1 d-flex align-items-center justify-content-center">
                    <ul className={`list-unstyled d-flex align-items-center m-0 gap-5 ${styles.ul}`}>
                        <li>
                            <Link 
                                to={'/filters'} 
                                className="text-decoration-none text-default-color"
                            >
                                Alugar imóveis
                            </Link>
                        </li>
                        <li>
                             <Link 
                                to={'/filters'} 
                                className="text-decoration-none text-default-color"
                            >
                                Comprar imóveis
                            </Link>
                        </li>
                        <li>
                             <Link 
                                to={'/filters'} 
                                className="text-decoration-none text-default-color"
                                onClick={(e)=>{
                                    if(!getDataFromStorage('user')){
                                        e.preventDefault()
                                        setShowLocalModal('login')
                                        handleShowModal()
                                        return
                                    }

                                }}
                            >
                                Destacar imóvel
                            </Link>
                        </li>
                        <li>
                             <Link 
                                to={'/cadastrar-imovel'} 
                                onClick={(e)=>{
                                    if(!getDataFromStorage('user')){
                                        e.preventDefault()
                                        setShowLocalModal('login')
                                        handleShowModal()
                                        return
                                    }

                                }}
                                className="text-decoration-none text-default-color"
                            >
                                Cadastrar imóvel
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="d-flex align-items-center gap-4 px-3">
                    {/* <div className={`${styles.favourites} d-flex align-items-center justify-content-center text-default-color rounded-2`}>
                        <FavouriteIcon size={18}/>
                        Favoritos
                    </div> */}
                    <div className="dropdown" onClick={() => {
                        if(!isLogged){
                            setShowLocalModal('login')
                            handleShowModal()
                        }
                    }}>
                        <a className={`${styles.loginDropdown} btn dropdown-toggle d-flex align-items-center p-0 gap-1 border border-0`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <UserCircleIcon size={24} color="#3541A9"/>
                            <div className="d-flex flex-column align-items-start">
                                <span className="m-0 text-decoration-none">Olá!</span>
                                <span className="m-0 text-decoration-none text-truncate fw-semibold">{getDataFromStorage('user') ? getDataFromStorage('user').email : 'Entrar'}</span>
                            </div>
                        </a>
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
                                    onClick={() => {
                                        logout()
                                        localStorage.removeItem('user')
                                    }}
                                >
                                    <LogoutCircle01Icon />
                                    Terminar sessão
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            {/* <div>
                <Navbar key={'xxl'} expand={'xxl'} className="bg-body-tertiary mb-3">
                    <Container fluid>
                        <Navbar.Brand href={'/'} className="img">
                            <img src={Logo} alt=""/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xxl`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-xxl`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-xxl`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xxl`}>
                                  Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className="border d-xxl-flex justify-content-xxl-between">
                                <Nav className="">
                                    <ul className="list-unstyled d-flex flex-column align-items-start d-xxl-flex flex-xxl-row align-items-xxl-center m-xxl-0 mb-3 gap-3 gap-xxl-5">
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
                                </Nav>
                                <div className="d-flex align-items-center gap-4 px-3">
                                    <div className={`${styles.favourites} d-flex align-items-center justify-content-center text-default-color rounded-2`}>
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
                                                <span className="m-0 text-decoration-none">Olá!</span>
                                                <span className="m-0 text-decoration-none fw-semibold">Entrar</span>
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
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            </div> */}
        </div>
    )
}