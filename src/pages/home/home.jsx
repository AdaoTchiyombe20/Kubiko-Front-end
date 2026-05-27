import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import { Theme } from "@radix-ui/themes";
import { ArrowRight01Icon, ArrowRight02Icon, ArrowRight03Icon, City03Icon, FavouriteCircleIcon, Home12Icon, Home13Icon, House01Icon, PinLocation03Icon, Search01Icon, SearchingIcon, SolidLine01Icon, UserSearch02Icon, WinkIcon } from "hugeicons-react";
import Tab from "../../components/tab/tab";
import Cards from "../../components/cards/cards";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Carrousel from "../../components/carousel/carousel";
import PlanCards from "../../components/planCards/planCards";
import RandomText from "../../components/randomTextAndSvg/randomText";
import RecentSearchs from "../../components/recentSearchs/recentSearchs";
import PublicityCards from "../../components/publicityCards/publicityCards";
import FeaturedProperties from "../../components/ featuredProperties/ featuredProperties";
import { getAllProperties } from "../../utils/requests";
import house5 from '../../assets/imgs/house5.png'

import styles from './home.module.css'

export default function Home(){
    const navigate = useNavigate()
    const [homeFilters, setHomeFilters] = useState({
        type_of_purchase: '',
        type_of_property: '',
        is_negotiable: '',
        max_price: ''
    })

    const plans = [
        {
            name: 'Fácil 24h',
            price: 1000,
            description: 'Built for teams that need speed, structure, and real-time collaboration',
            features: [
                'Up to 10 users',
                'Advanced Task management',
                'Up to 10 users',
                'Up to 10 users',
                'Up to 10 users',
            ]
        },
        {
            name: 'Promo Kubiko',
            price: 2500,
            description: 'Perfect for individuals or small teams starting with task management',
            features: [
                'Up to 10 users',
                'Advanced Task management',
                'Up to 10 users',
                'Up to 10 users',
                'Up to 10 users',
                'Up to 10 users',
                'Up to 10 users'
            ]
        },
        {
            name: 'Profissional',
            price: 5500,
            description: 'Perfect for individuals or small teams starting with task management',
            features: [
                'Up to 5 users',
                'Basic Task management',
                'Up to 5 users',
                'Up to 5 users',
                'Up to 5 users',   
            ]
        }
    ]

    const publicityCards = [
        {
            icon: <Home12Icon color="#ffff" />,
            text: "Pesquise casas, apartamentos, terrenos e espaços comerciais com informações completas, fotos reais e dados verificados",
            title: "Encontre imóveis com confiança"
        },
        {
            icon: <SearchingIcon color="#ffff" />,
            text: "Cada imóvel passa por um processo de validação para reduzir fraudes e anúncios falsos. Mais segurança para quem procura, mais credibilidade para quem anuncia.",
            title: "Anúncios validados e transparentes"
        },
        {
            icon: <PinLocation03Icon color="#ffff"/>,
            text: "Encontre imóveis por município, bairro ou zona específica.Ideal para quem já sabe onde quer morar ou investir, sem perder tempo.",
            title: "Busca inteligente por localização"
        }
    ]
    const filterSelectsArray = [
        {
            name: 'type_of_purchase',
            label: 'Propósito',
            option: ['FOR_RENT', 'FOR_SALE']
        },
        {
            name: 'type_of_property',
            label: 'Tipo de Imóvel',
            option: [
                'APARTAMENTO',
                'VIVENDA',
                'ESCRITORIO',
                'FAZENDA',
                'TERRENO',
                'LOJA',
                'ARMAZEM',
                'HOTEL',
                'PENTHOUSE',
                'DUPLEX',
                'TRIPLEX',
                'QUARTO',
                'SUITE',
                'CONDOMINIO',
                'RESORT',
                'HOSPITAL',
                'ESCOLA',
                'RESTAURANTE',
                'CINEMA',
                'SHOPPING',
            ]
        },
        {
            name: 'is_negotiable',
            label: 'É Negociável',
            option: ['true', 'false']
        },
    ]

    var [isLoading, setIsLoading] = useState(false)
    var [allProperties, setAllProperties] = useState([])
    useEffect(() => {
        getAllProperties(setIsLoading, setAllProperties)
    }, [])
    const handleHomeSearch = (e) => {
        e.preventDefault()

        const cleanedFilters = Object.fromEntries(
            Object.entries(homeFilters).filter(([_, value]) => value !== '')
        )
        const queryString = new URLSearchParams(cleanedFilters).toString()

        navigate(`/filters${queryString ? `?${queryString}` : ''}`)
    }

    return(
        <>
            <Header />

            <div 
                className="d-flex flex-column pb-3 pb-md-4 position-relative mb-5"
                style={{
                    marginTop: '80px',
                }}
            >
                <Carrousel />
                <div className={`${styles.aboveCarrousel} h-100 w-100 d-flex flex-column justify-content-between align-items-center position-absolute`}>
                    <div className="container px-3">
                        <h2 className="text-white text-center mb-3 mb-md-5">Bem-vindo ao <span className="text-default-color">Kubiko</span></h2>
                        <h1 className="text-center lh-1 text-default-color">Invista Hoje no <br /> Sonho da sua casa</h1>
                    </div>
                    <form 
                        className={`${styles.homePageForm} row bg-white d-flex align-items-end rounded-4 gap-3 shadow-lg py-5 px-4`}
                        onSubmit={handleHomeSearch}
                    >
                        {
                            filterSelectsArray.map((select, index) => (
                                <div className="col border-end border-2 pe-4 d-flex flex-column">
                                    <label htmlFor="">{select.label}</label>
                                    <Form.Select
                                        value={homeFilters[select.name]}
                                        onChange={(e) => setHomeFilters(prev => ({
                                            ...prev,
                                            [select.name]: e.target.value
                                        }))}
                                    >
                                        <option value={""} disabled>{select.label}</option>
                                        {
                                            select.option.map((option, index) => (
                                                <option key={index} value={`${option}`}>{option === 'FOR_RENT' ? 'Aluguel' : option === 'FOR_SALE' ? 'Venda' : option === 'true' ? 'Negociável' : option === "false" ? 'Não Negociável' : option}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </div>
                            ))
                        }
                        <div className="col border-end border-2 pe-4 d-flex flex-column justify-content-between h-100">
                            <label htmlFor="">Preço</label>
                            <input
                                type="number"
                                name="max_price"
                                className="rounded-3 border border-2 outline-none shadow-none"
                                placeholder="20000kz" 
                                min={25000}
                                value={homeFilters.max_price}
                                onChange={(e) => setHomeFilters(prev => ({
                                    ...prev,
                                    max_price: e.target.value
                                }))}
                                style={{
                                    padding: '11px 20px 11px 12px'
                                }}
                            />
                        </div>
                        <div className="col">
                            <button 
                                type="submit"
                                className="btn btn-primary bg-default-color border-0 text-white w-100 d-flex justify-content-center align-items-center gap-3 rounded-3"
                            >
                                Pesquisar
                                <Search01Icon size={18} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
             
            <main className={`mb-5 homePage-main mt-5 ${styles.homeMain}`}>
                <div className="d-flex mb-4">
                    <RandomText text='IMÓVEIS' textColor={"#10265B"} borderRadius={'rounded-5'} backgroundColor={'#eaf6fc'} icon={<City03Icon size={16} color="#10265B"/>}/>
                </div>
                <h2 className="mb-4">Onde você quiser morar, o Kubiko ajuda a encontrar.</h2>
                {/* <Theme>
                    <Tab />
                </Theme> */}
                <div className="my-4">
                    <div className={`mb-4 ${styles.realStateCardsContainer}`}>
                        {
                            isLoading ? (
                                <div 
                                    className="w-100 h-100 my-4 d-flex justify-content-center align-items-center"
                                >
                                    <Spinner 
                                        animation="border"
                                        role="status" 
                                        variant="primary"
                                        style={{ width: "5rem", height: "5rem" }}
                                    >
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            ) : (
                                allProperties?.map((property, index) => (
                                    index < 12 && (
                                        <Cards 
                                            key={index} 
                                            index={index + 1}
                                            data = {property.property} 
                                        />
                                    )
                                ))
                            )
                        }
                    </div>
                    <div>
                        <Link to={'/filters'} className="d-flex align-items-center gap-2 text-decoration-none text-default-color my-4">
                            <span>Ver mais</span>
                            <ArrowRight02Icon />
                        </Link>
                    </div>
                </div>
                <div className="row align-items-center justify-content-center g-3 my-4">
                    <div className="d-none d-md-block col-md border border-1">
                        
                    </div>
                    <div className="col-12 col-md-auto d-flex align-items-center justify-content-center gap-2 text-center">
                        <div className="d-flex align-items-center justify-content-center rounded-3 px-2" style={{backgroundColor: '#eaf6fc'}}>
                            <WinkIcon color="#10265B" />
                        </div>
                        <p className="m-0">Dúvidas? Fale Conosco</p>
                        <ArrowRight03Icon color="#D28920"/>
                    </div>
                    <div className="d-none d-md-block col-md border border-1">
                    </div>
                </div>
                <div className="mb-4">
                    <div className="d-flex justify-content-center mb-4">
                        <RandomText text='SÓ FALTA VOCÊ' textColor='#10265B' borderRadius={'rounded-5'} backgroundColor={'#EDEFFD'} icon={<FavouriteCircleIcon size={16} color="#3541A9"/>}/> 
                    </div>
                    <h1 className="text-center mb-4">Confira o que podemos fazer por você</h1>
                    <div className="row row-cols-1 row-cols-xl-3 g-4">
                        {
                            publicityCards.map((item, index) => (
                                <PublicityCards key={index} icon={item.icon} text={item.text} title={item.title}/>                                
                            ))
                        }
                        
                    </div>
                </div>
                <div className="d-flex mb-4">
                    <RandomText text='FAÇA PARTE VOCÊ TAMBÉM' textColor={"#10265B"} borderRadius={'rounded-5'} backgroundColor={'#EDEFFD'} icon={<UserSearch02Icon size={16} color="#3541A9"/>}/>
                </div>
                
                <div>
                    <h1 
                        className={`text-center display-1 ${styles.highlightTitle}`} 
                        style={{
                            fontWeight: '500',
                            marginTop: '100px'
                        }}
                    >
                        Destaque o seu <span className="text-default-color">imóvel</span>
                    </h1>
                    <p 
                        className="text-center my-3 mx-auto" 
                        style={{
                            fontSize: '18px'
                        }}
                    >
                        Transforme seu imóvel em uma estrela! Com nosso sistema de patrocínio, sua propriedade aparece em destaque para milhares de compradores qualificados.
                    </p>
                    <div className="container-fluid">
                        <div className="row g-4 g-xl-5 my-5 px-0 px-lg-4 px-xl-5 align-items-stretch">
                            <div className="col-12 col-xl-4">
                              <div className="h-100 shadow-lg rounded-4 px-3 px-sm-4 py-4">
                                <div className="d-flex align-items-center gap-2 mb-4">
                                    <div className="d-flex justify-content-center align-items-center text-default-color text-white rounded-circle" style={{
                                        height: '50px',
                                        width: '50px'
                                    }}>
                                        <House01Icon size={26}/>
                                    </div>
                                    <div>
                                        <p className="m-0 lh-1 fw-semibold">Visibildidade premium</p>
                                        <p className="m-0 fw-light">Apareça no topo  dos resultados de busca</p>
                                    </div>
                                </div>
                                <ul className="fw-light ps-5 mb-4">
                                    <li>Destaque visual com badge especial</li>
                                    <li>Prioridade nos resultados de pesquisa</li>
                                    <li>Mais visualizações e contatos</li>
                                    <li>Estatísticas detalhadas de performance</li>
                                </ul>
                                <div className="d-flex flex-column align-items-center fw-semibold rounded-2 py-3 mb-3" style={{
                                    backgroundColor: '#EDEFFD',
                                    color: '#10265B'
                                }}>
                                    <p className="">1000AOA / 24h</p>
                                    <p className="m-0">por dia de destaque</p>
                                </div>
                                <button type="button" className="btn btn-primary bg-default-color border-0 shadow-none outline-none text-white w-100 py-2">Destacar agora</button>
                              </div>
                            </div>
                            <div className={`${styles.highlightPropertyImages} col-12 col-xl-8`}>
                                <div className="border"></div>
                                <div className="border"></div>
                                <div className="border"></div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="my-5" >
                    <h1 className="text-center display-4" style={{fontWeight: '500'}}>Planos que crescem com você</h1>
                    <p className="text-center text-secondary mt-1 mb-5 mx-auto" style={{
                        fontSize: '18px'
                    }}>
                        Escolha o plano perfeito para sua agência imobiliária. Desde iniciantes até profissionais experientes, temos a solução ideal. Ver planos
                    </p>
                    <div className={`${styles.plansContainer}`}>
                        {
                            plans.map((plan, index) => (
                                <PlanCards key={index} index={index} name={plan.name} price={plan.price} description={plan.description} features={plan.features}/>
                            ))
                        }
                    </div>
                </div>
                <RecentSearchs />
            </main>

            <Footer />

        </>
    )
}
