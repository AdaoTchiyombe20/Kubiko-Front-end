import { useContext, useState } from 'react';
import { AppContext } from '../context/appcontext';
import { ArrowLeft02Icon, Calendar04Icon, Call02Icon, GoogleIcon, Route03Icon, UserIcon } from 'hugeicons-react';
import { MdOutlineLogin } from "react-icons/md";
import Alert from '../alert/alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PhoneInputAuth from '../phoneInput/phoneInput';
import InputOtpAuth from '../inputOpt/inputOpt';
import styles from './modal.module.css'
import TimeChoose from '../timeChoose/timeChoose';
import ScheduleCalendar from '../calendar/calendar';
import VisitDetails from '../realStateVisitDetails/realStateVisitDetails';
import BackButton from '../../navigateBackButton/navigateBackButton';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

export default function VariousModal(props) {

    const {showModal, handleShowModal, showLocalModal, setShowLocalModal, isLogged} = useContext(AppContext)

    const loginForm = z.object({
        email: z.string().trim().email('Email inválido'),
        password: z.string().trim().min(6, 'A senha deve conter no mínimo 6 caracteres')
    })
    const {register, formState : {errors}, handleSubmit} = useForm({
        resolver: zodResolver(loginForm)
    })
    const onSubmit = (data) => {
        console.log(data)
        handleShowModal()
    }
    const navigate = useNavigate()

    return (
        <>
        <Modal
            show={showModal}
            onHide={handleShowModal}
            backdrop="static"
            keyboard={false}
            centered
        >
            {
                showLocalModal == 'phone' && ( <BackButton icon={<ArrowLeft02Icon />} onClick={() => setShowLocalModal('login')} /> )
            }
            {
                showLocalModal == 'setProfile' && ( <BackButton icon={<ArrowLeft02Icon />} onClick={() => setShowLocalModal('login')} /> )
            }
            {
                showLocalModal == 'scheduleRequested' && ( <BackButton icon={<ArrowLeft02Icon />} onClick={() => setShowLocalModal('scheduleVisit')} /> )
            }
            <Modal.Header className='border-0 p-0' closeButton = {showLocalModal == 'scheduleVisit' ? true : false}>
            <Modal.Title className={`fw-semibold fs-3 ${showLocalModal === 'setProfile' ? 'mt-3' : 'mt-0'}`}>
                {showLocalModal == 'login' && 'Entre ou crie sua conta'}
                {showLocalModal == 'phone' && 'Informe seu número'}
                {showLocalModal == 'code' && 'Código de Verificação'}
                {showLocalModal == 'setProfile' && 'Iniciar Sessão'}
                {showLocalModal == 'scheduleVisit' && 'Quando deseja visitar?'}
                {showLocalModal == 'scheduleRequested' && 'Detalhes da Visita'}
            </Modal.Title>
            </Modal.Header>
            {
                showLocalModal == 'login' && <small className='text-secondary mb-4'>Entre na sua conta através dos seus canais de acesso</small>
            }
            {
                showLocalModal == 'phone' && <small className='text-secondary mb-4'>Enviaremos um código de código de confirmação.Entre na sua conta através dos seus canais de acesso</small>
            }
            {
                showLocalModal == 'code' && <small className='text-secondary mb-4'>Insira o código de 6 dígitos que enviamos para o número <span className='fw-semibold text-black'>+244925332928</span>.</small>
            }
            {
                showLocalModal == 'setProfile' && <small className='text-secondary mb-4'>Bem-vindo ao Kubibo, configure a sua conta para buscares ou anunciares imóveis.</small>
            }
            <Modal.Body className='p-0'>
                {
                    showLocalModal == 'login' &&
                    (
                        <div className='d-flex flex-column align-items-center gap-3 mb-3'>
                            <div className='d-flex flex-column gap-2 w-100'>
                                <button className={`${styles.googleButton} btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2 py-2 border-0 rounded-3`}>
                                    <GoogleIcon />
                                    Continuar com Google
                                </button>
                                <button 
                                    className={`${styles.phoneAuthenticationButton} w-100 d-flex justify-content-center align-items-center gap-2 py-2 border-0 rounded-3`} 
                                    onClick={()=>{
                                        setShowLocalModal('setProfile')
                                    }}
                                    form='modalLoginForm'
                                >
                                    <MdOutlineLogin size={22} />
                                    Iniciar Sessão
                                </button>
                            </div>
                            <p className='d-flex align-items-center gap-1 m-0 text-center'>
                                Não tem uma conta? 
                                <Link 
                                    to={'/sign'}
                                    className='text-decoration-none text-primary'
                                    state={{
                                        showLogin: false
                                    }}                                      
                                >
                                    Criar Conta
                                </Link>
                            </p>
                        </div>
                    )
                }
                {
                    showLocalModal == 'phone' && 
                    (
                        <div>
                            <PhoneInputAuth />
                            <div className='d-flex flex-column align-items-center gap-3 mt-3 mb-3'>
                                <div className='d-flex flex-column gap-2 w-100'>
                                    <button className={`${styles.sendPhoneCodeButton} btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2 py-2 border-0 rounded-3`} onClick={()=>{
                                        setShowLocalModal('code')
                                    }}>
                                        Enviar código
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    showLocalModal == 'code' && 
                    (
                        <div>
                            <InputOtpAuth />
                            <div className='d-flex flex-column align-items-center gap-3 mt-3'>
                                <button className={`${styles.sendPhoneCodeButton} btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2 py-2 border-0 rounded-3`} onClick={()=>{
                                    setShowLocalModal('setProfile')
                                }}>
                                    Confirmar
                                </button>
                                <a href="#" className='text-black'>Não recebi um código</a>
                            </div>
                        </div>
                    )
                }
                {
                    showLocalModal == 'setProfile' && 
                    (
                        <form 
                            className={`${styles.setProfileForm} d-flex flex-column align-items-center gap-2`}
                            id='modalLoginForm'
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className='d-flex flex-column gap-2 w-100'>
                                <label htmlFor="" className='ps-1'>Email</label>
                                <input type="email" name="email" placeholder='Qual é o seu email?' {...register('email')} />
                                {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                            </div>
                            <div className='d-flex flex-column gap-1 w-100 mb-4'>
                                <label htmlFor="" className='ps-1'>Senha</label>
                                <input type="password" name="password" placeholder='Insira a sua senha' {...register('password')} />
                                {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                            </div>
                            <button 
                                type='submit'
                                className={`${styles.sendPhoneCodeButton} btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2 py-2 border-0 rounded-3`}
                            >
                                Iniciar Sessão
                            </button>
                        </form>
                    )
                }
                {
                    showLocalModal == 'scheduleVisit' && (
                        <>
                            <h2 className='fs-5 mt-3'>Escolher Data</h2>
                            <div className='my-4'>
                                <ScheduleCalendar />
                            </div>
                            <h2 className='fs-5'>Escolher um horário</h2>
                            <TimeChoose />
                            <button type={isLogged && 'submit'} className={`${styles.sendPhoneCodeButton} btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2 py-2 mb-3 border-0 rounded-3`} onClick={()=>{
                                isLogged ? setShowLocalModal('scheduleRequested')  : setShowLocalModal('login') 
                            }}>
                                {isLogged ? 'Continuar' : 'Entrar ou criar conta'}
                            </button>
                            {!isLogged && <Alert />}
                        </>
                    )
                }
                {
                    showLocalModal == 'scheduleRequested' && (
                        <>
                            <div className='d-flex flex-column gap-3 my-4'>
                                <VisitDetails icon={<Calendar04Icon color='#808080' />} title={'Data e horário'} text={'Sábado, 03 de Janeiro - 08:00'}/>
                                <VisitDetails icon={<Route03Icon color='#808080' />} title={'Endereço'} text={'Alvalade, Luanda'}/>
                                <VisitDetails icon={<UserIcon color='#808080' />} title={'Corretor'} text={'Cláudio Bênção'}/>
                            </div>
                            <button className={`${styles.sendPhoneCodeButton} btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2 py-2 border-0 rounded-3`} onClick={()=>{
                                handleShowModal()
                            }}>
                                Solicitar Visita
                            </button>
                        </>
                    )
                }
            </Modal.Body>
            <Modal.Footer className='border-0 p-0'>
                {
                    showLocalModal == 'login' || showLocalModal == 'phone' &&
                    (
                        <p className='m-0 text-secondary'>Ao continuar, você está de acordo com os <span><a href="#" className='text-black' >Termos de Uso do Kubiko</a></span> e ciente do <span><a href="#" className='text-black'>Aviso de Privacidade</a></span>.</p>
                    )
                }
            {/* <Button variant="secondary" onClick={handleShowModal}>
                Close
            </Button>
            <Button variant="primary">Understood</Button> */}
            </Modal.Footer>
        </Modal>
        </>
    )
}