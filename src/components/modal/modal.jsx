import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineLogin } from "react-icons/md";
import { AppContext } from '../context/appcontext';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { ArrowLeft02Icon, Calendar04Icon, Call02Icon, GoogleIcon, Route03Icon, UserIcon } from 'hugeicons-react';
import Alert from '../alert/alert';
import Modal from 'react-bootstrap/Modal';
import InputOtpAuth from '../inputOpt/inputOpt';
import TimeChoose from '../timeChoose/timeChoose';
import ScheduleCalendar from '../calendar/calendar';
import PhoneInputAuth from '../phoneInput/phoneInput';
import { InputMask } from "primereact/inputmask";
import BackButton from '../../navigateBackButton/navigateBackButton';
import VisitDetails from '../realStateVisitDetails/realStateVisitDetails';
import styles from './modal.module.css'
import { signUser, verifyIndividualOwner } from '../../utils/requests';

const formatAngolaIban = (value = '') => {
    const rawValue = value.replace(/\s/g, '').toUpperCase()
    const withoutPrefix = rawValue.startsWith('AO06') ? rawValue.slice(4) : rawValue.replace(/^AO?0?6?/, '')
    const iban = `AO06${withoutPrefix.replace(/\D/g, '')}`.slice(0, 25)

    return iban.match(/.{1,4}/g)?.join(' ') || 'AO06'
}

export default function VariousModal() {

    const {showModal, closeModal, showLocalModal, setShowLocalModal, isLogged} = useContext(AppContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isFetchingBI, setIsFetchingBI] = useState(false)

    const assumeIndividualForm = z.object({
        ownerName: z.string().trim().min(9, 'O nome deve conter no mínimo 9 caracteres'),
        bi: z.string().trim().min(14, 'O BI deve conter no mínimo 14 caracteres').max(14, 'O BI deve conter no máximo 14 caracteres'),
        phone: z.string().trim().min(12, 'O número de telefone deve conter no mínimo 9 caracteres').max(12, 'O número de telefone deve conter no máximo 9 caracteres'),
        bankAccount: z.string().refine(
            value => value.replace(/\s/g, '').length === 25,
            'O IBAN deve conter 25 caracteres'
        ),
        dateOfBirth: z.string().min(10, "Data inválida")
    })

    const {
        register: registerAssumeIndividual,
        formState : {errors: errorsAssumeIndividual}, 
        handleSubmit: handleSubmitAssumeIndividualForm,
        setValue,
        watch
    } = useForm({
        resolver: zodResolver(assumeIndividualForm),
        mode: 'onChange',
        defaultValues: {
            phone: '',
            ownerName: ''
        }
    })

    
    const onSubmitAssumeIndividualForm = async (data) => {
        const payload = {
            ...data,
            bankAccount: data.bankAccount.replace(/\s/g, ''),
            phone: data.phone?.replace(/^244/, '') // remove só no início
        }
        console.log(payload)
        const success = await verifyIndividualOwner(payload, setIsLoading, '/profile/individual-owner')
        console.log("Sucesso: ", success)
        if(success !== null)
            closeModal()
            
        // setIsLoading(true)
        // const success = await signUser(data, setIsLoading, null, '/auth/register/individual')
    }
    const handleBIChange = async (e) => {
        const bi = e.target.value

        if (bi.length === 14) {
            try {
                setIsFetchingBI(true)
                const response = await fetch(`http://consulta.edgarsingui.ao/consultar/${bi}`)
                const result = await response.json()
                console.log(result)
                setValue('ownerName', result.name || '', {
                    shouldValidate: true,
                    shouldDirty: true
                })
                const date = new Date(result.data_de_nascimento).toLocaleDateString('pt-PT').replaceAll("/", "-") 
                setValue('dateOfBirth', date || '', {
                    shouldValidate: true,
                    shouldDirty: true,
                })
            } catch (error) {
                console.log(error)
            } finally {
                setIsFetchingBI(false)
            }
        }
    }
    const phoneValue = watch('phone')

    const loginForm = z.object({
        email: z.string().trim().email('Email inválido'),
        password: z.string().trim().min(6, 'A senha deve conter no mínimo 6 caracteres')
    })
    const {register, formState : {errors}, handleSubmit} = useForm({
        resolver: zodResolver(loginForm)
    })
    const onSubmit = async (data) => {
        const success = await signUser(data, setIsLoading, null, '/auth/login')
        if (success) {
            closeModal()
            location.reload()
        }
    }

    return (
        <>
        <Modal
            show={showModal}
            onHide={closeModal}
            backdrop={showLocalModal === 'login' ? true : 'static'}
            keyboard={showLocalModal === 'login' ? true : false}
            centered
            scrollable
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
                {showLocalModal == 'registerProperty' && 'Cadastro de imóvel'}
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
                showLocalModal == 'registerProperty' && <small className='text-secondary mb-4'>Para cadastrar seu imóvel, preencha os campos abaixo.</small>
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
                                    onClick={closeModal}
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
                                    <button 
                                        className={`${styles.sendPhoneCodeButton} btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2 py-2 border-0 rounded-3`}
                                        onClick={()=>{
                                            setShowLocalModal('code')
                                        }}
                                    >
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
                    showLocalModal == 'registerProperty' && 
                    (
                        <form 
                            className={`${styles.setProfileForm} d-flex flex-column align-items-center gap-2`}
                            id='assumeIndividualForm'
                            onSubmit={handleSubmitAssumeIndividualForm(onSubmitAssumeIndividualForm)}
                        >
                            <div className='d-flex flex-column gap-2 w-100 mb-2'>
                                <label htmlFor="" className='ps-1'>Bilhete de Identidade*</label>
                                <input
                                    type="text" 
                                    {...registerAssumeIndividual('bi')} 
                                    placeholder='Insira o seu BI' 
                                    onChange={(e) => {
                                        registerAssumeIndividual('bi').onChange(e)
                                        handleBIChange(e)
                                    }}
                                />
                                {errorsAssumeIndividual.bi && <p className='text-danger'>{errorsAssumeIndividual.bi.message}</p>}
                            </div>
                            <div className='d-flex flex-column gap-2 w-100 mb-2'>
                                <label htmlFor="" className='ps-1 text-secondary'>Nome</label>
                                <input type="text" {...registerAssumeIndividual('ownerName')} placeholder='Nome completo' disabled />
                                {/* {errorsAssumeIndividual.ownerName && <p className='text-danger'>{errorsAssumeIndividual.ownerName.message}</p>} */}
                            </div>
                            <div className='d-flex flex-column gap-2 w-100 mb-2'>
                                <label htmlFor="" className='ps-1'>Número de telefone</label>
                                <PhoneInputAuth
                                    value={phoneValue}
                                    onChange={(value) => 
                                        setValue(
                                            'phone', 
                                            value, 
                                            {
                                                shouldValidate: true,
                                                shouldDirty: true
                                            }
                                        )
                                    }
                                />
                                {errorsAssumeIndividual.phone && <p className='text-danger'>{errorsAssumeIndividual.phone.message}</p>}
                            </div>
                            <div className='d-flex flex-column gap-2 w-100 mb-2'>
                                <label htmlFor="" className='ps-1'>Data de Nascimento</label>
                                <InputMask 
                                    mask="99-99-9999" 
                                    placeholder="MM-DD-AAAA" 
                                    value={watch('dateOfBirth') || ''}
                                    onChange={(e) =>
                                        setValue('dateOfBirth', e.target.value, {
                                            shouldValidate: true,
                                            shouldDirty: true,
                                        })
                                    }
                                    disabled
                                />
                                {errorsAssumeIndividual.dateOfBirth && <p className='text-danger'>{errorsAssumeIndividual.dateOfBirth.message}</p>}
                            </div>
                            <div className='d-flex flex-column gap-2 w-100 mb-3'>
                                <label htmlFor="" className='ps-1 d-flex'>IBAN <span className='align-self-start'>*</span></label>
                                <input
                                    type="text"
                                    {...registerAssumeIndividual('bankAccount')}
                                    placeholder='AO06 0000 0000 0000 0000 0000 0'
                                    maxLength={31}
                                    onFocus={() => {
                                        if (!watch('bankAccount')) {
                                            setValue('bankAccount', 'AO06', {
                                                shouldValidate: true,
                                                shouldDirty: true
                                            })
                                        }
                                    }}
                                    onChange={(e) => {
                                        setValue('bankAccount', formatAngolaIban(e.target.value), {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        })
                                    }}
                                />
                                {errorsAssumeIndividual.bankAccount && <p className='text-danger'>{errorsAssumeIndividual.bankAccount.message}</p>}
                            </div>
                            <button 
                                type='submit'
                                disabled={isLoading}
                                className={`${styles.sendPhoneCodeButton} btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2 py-2 border-0 rounded-3`}
                            >
                                {isLoading ? 'Carregando...' : 'Continuar'}
                            </button>
                        </form>
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
                                disabled={isLoading}
                                className={`${styles.sendPhoneCodeButton} btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2 py-2 border-0 rounded-3`}
                            >
                                {isLoading ? 'Carregando...' : 'Iniciar Sessão'}
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
                                closeModal()
                            }}>
                                Solicitar Visita
                            </button>
                        </>
                    )
                }
            </Modal.Body>
            <Modal.Footer className='border-0 p-0'>
                {
                    (showLocalModal == 'login' || showLocalModal == 'phone') &&
                    (
                        <p className='m-0 text-secondary'>Ao continuar, você está de acordo com os <span><a href="#" className='text-black' >Termos de Uso do Kubiko</a></span> e ciente do <span><a href="#" className='text-black'>Aviso de Privacidade</a></span>.</p>
                    )
                }
            </Modal.Footer>
        </Modal>
        </>
    )
}
