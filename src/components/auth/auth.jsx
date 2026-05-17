import styles from './auth.module.css'
import loginImg from '../../assets/imgs/loginImg.png'
import Logo from '../../assets/imgs/kubiko.png'
import { Facebook01Icon, Facebook02Icon, InstagramIcon, Linkedin01Icon, Linkedin02Icon } from 'hugeicons-react';
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { signUser } from '../../utils/requests';

export default function Auth() {

    const location = useLocation()
    const state = location.state || {}
    const [showLogin, setShowLogin] = useState(true);

    useEffect(() => {
        if (location.state?.showLogin === false)
            setShowLogin(false)
    }, [location.state])

    const [isLoading, setIsLoading] = useState(false);
    const loginObject = z.object({
        email: z.string().trim().email('Email inválido'),
        password: z.string().trim().min(6, 'A senha deve conter no mínimo 6 caracteres')
    })
    const {register, formState : { errors }, handleSubmit} = useForm({
        resolver: zodResolver(loginObject)
    })
    const navigate = useNavigate()
    const onSubmit = (data) => {
        signUser(data, setIsLoading, navigate, showLogin ? '/auth/login' : '/auth/signup/individual')
        // console.log(data)
    }

    useEffect(() => {

    }, [])

    return (
        <div className="container-fluid vh-100">
            <div className="row h-100">
                <div className="col-md-6 h-100 p-0">
                    <div className={`h-100 w-100`}>
                        <img 
                            src={loginImg}
                            alt="Login"
                            className='w-100 h-100 z-3'
                        />
                    </div>
                </div>

                <div className="col-md-6 h-100 d-flex flex-column align-items-center justify-content-between bg-white2 z-0">
                    <div className='align-self-end pt-4 pe-4'>
                        <img 
                            src={Logo} 
                            alt="Logo"
                        />
                    </div>
                    <AnimatePresence mode='wait' >
                        <div className='w-75 pt-md-4'>
                            <div className='d-flex flex-column gap-1 mb-4'>
                                <motion.div
                                    key={showLogin ? 'login' : 'register'}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h1 className='display-4 fw-semibold m-0'>{showLogin ? 'Entre na sua conta' : 'Crie uma conta'}</h1>
                                    <p className='m-0'>{showLogin ?  'Aproveite o melhor da Plataforma' : 'Crie sua conta para acessar todos os recursos'}</p>
                                </motion.div>
                            </div>
                            <form 
                                action=""
                                className='d-flex flex-column gap-4'
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className='d-flex flex-column gap-1'>
                                    <label htmlFor="" className='ps-1'>Email</label>
                                    <input 
                                        type="email" 
                                        required 
                                        placeholder='Insira o seu email' 
                                        className='form-control py-3 px-3 rounded-3 fs-6 shadow-none outline-none'
                                        {...register('email')}
                                    />
                                    {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                                </div>
                                <div className='d-flex flex-column gap-1'>
                                    <label htmlFor="" className='ps-1'>Senha</label>
                                    <input 
                                        type="password" 
                                        required 
                                        placeholder='Insira a sua senha' 
                                        className='form-control py-3 px-3 rounded-3 fs-6 shadow-none outline-none'
                                        {...register('password')}
                                    />
                                    {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                                </div>
                                <a href="#" 
                                    className={`${!showLogin ? 'd-none' : 'text-decoration-none text-end'}`}
                                >
                                    Esqueceu a senha?
                                </a>
                                <div className={`${!showLogin ? 'mt-3' : ''}`}>
                                    <button 
                                        type='submit'
                                        className='btn btn-primary bg-default-color border-0 rounded-4 w-100 py-3'
                                        disabled={isLoading}
                                        style={{
                                            opacity: isLoading ? 0.7 : 1,
                                            cursor: isLoading ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {
                                            isLoading ? 'Carregando...' : showLogin ? 'Entrar' : 'Cadastrar'
                                        }
                                    </button>
                                </div>
                                <div className='d-flex align-items-center gap-2'>
                                    <hr className='border border-secondary-subtle border-1 w-50'/>
                                    ou
                                    <hr className='border border-secondary-subtle border-1 w-50'/>
                                </div>
                                <div>
                                    <button
                                        className='btn btn-primary bg-default-color border-0 rounded-4 w-100 py-3'
                                        disabled={isLoading}
                                        style={{
                                            opacity: isLoading ? 0.7 : 1,
                                            cursor: isLoading ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        Entrar com google
                                    </button>
                                </div>
                                <div className='d-flex align-items-center justify-content-center gap-1'>
                                    <motion.div
                                        key={showLogin ? 'login' : 'register'}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 30 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <span>{showLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}</span>
                                        <Link
                                            to={"#"}
                                            className='text-decoration-none'
                                            onClick={() => setShowLogin(!showLogin)}
                                        >
                                            {showLogin ? ' Cadastre-se' : ' Entrar'}
                                        </Link>
                                    </motion.div>
                                </div>
                            </form>
                        </div>
                    </AnimatePresence>
                    <div className='d-flex align-items-center justify-content-center gap-4 pb-5'>
                        <a href="#">
                            <FaFacebook size={30} className='text-default-color'/>
                        </a>
                        <a href="#">
                            <FaLinkedin size={30} className='text-default-color'/>
                        </a>
                        <a href="#">
                            <GrInstagram size={30} className='text-default-color'/>
                        </a>
                    </div>
                </div>
                
            </div>
        </div>
    );
}