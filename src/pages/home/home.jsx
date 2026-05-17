import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Theme } from "@radix-ui/themes";
import { ArrowRight01Icon, ArrowRight02Icon, ArrowRight03Icon, City03Icon, FavouriteCircleIcon, Home12Icon, Home13Icon, House01Icon, PinLocation03Icon, Search01Icon, SearchingIcon, SolidLine01Icon, UserSearch02Icon, WinkIcon } from "hugeicons-react";
import house5 from '../../assets/imgs/house5.png'
import Tab from "../../components/tab/tab";
import Cards from "../../components/cards/cards";
import Carrousel from "../../components/carousel/carousel";
import PlanCards from "../../components/planCards/planCards";
import RandomText from "../../components/randomTextAndSvg/randomText";
import RecentSearchs from "../../components/recentSearchs/recentSearchs";
import PublicityCards from "../../components/publicityCards/publicityCards";
import FeaturedProperties from "../../components/ featuredProperties/ featuredProperties";
import styles from './home.module.css'
import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

export default function Home(){

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

    var [realState, setRealState] = useState([])
    useEffect(() => {
        async function ListRealState(){
            const endpoint = 'http://localhost:3001/properties'

            try{
                const data = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'content-application': 'application/json'
                    }
                })

                var resposta = await data.json()
                setRealState(resposta)
                console.log(resposta)
            }
            catch(error){
                console.log("Erro: ", error)
            }
        }
        ListRealState()
    }, [])

    return(
        <>
            <Header />

            <div 
                className="d-flex flex-column pb-4 position-relative mb-5"
                style={{
                    marginTop: '80px'
                }}
            >
                <Carrousel />
                <div className={`${styles.aboveCarrousel} h-100 w-100 d-flex flex-column justify-content-between align-items-center position-absolute`}>
                    <div>
                        <h2 className="text-white text-center mb-5">Bem-vindo ao <span className="text-default-color">Kubiko</span></h2>
                        <h1 className="text-center lh-1 text-default-color">Invista Hoje no <br /> Sonho da sua casa</h1>
                    </div>
                    <form className={`${styles.homePageForm} row bg-white d-flex align-items-end rounded-4 gap-3 shadow-lg py-5 px-4`}>
                        <div className="col border-end border-2 pe-4 d-flex flex-column">
                            <label htmlFor="">Tipo de imóvel</label>
                            <Form.Select>
                                <option value="">Apartamento</option>
                            </Form.Select>
                        </div>
                        <div className="col border-end border-2 pe-4 d-flex flex-column">
                            <label htmlFor="">Localização</label>
                            <Form.Select>
                                <option value="">Kilamba</option>
                            </Form.Select>
                        </div>
                        <div className="col border-end border-2 pe-4 d-flex flex-column">
                            <label htmlFor="">Preço</label>
                            <Form.Select>
                                <option value="">20.000.000kz</option>
                            </Form.Select>
                        </div>
                        <div className="col border-end border-2 pe-4 d-flex flex-column">
                            <label htmlFor="">Nº de quartos</label>
                            <Form.Select>
                                <option value="">5 ou mais</option>
                            </Form.Select>
                        </div>
                        <div className="col">
                            <button className="btn btn-primary bg-default-color border-0 text-white w-100 d-flex justify-content-center align-items-center gap-3 rounded-3">
                                Pesquisar
                                <Search01Icon />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
             
            <main className="mb-5 homePage-main">
                <div className="d-flex mb-4">
                    <RandomText text='IMÓVEIS' textColor={"#D28920"} borderRadius={'rounded-5'} backgroundColor={'#FCF7EA'} icon={<City03Icon size={16} color="#D28920"/>}/>
                </div>
                <h2 className="mb-4">Onde você quiser morar, o Kubiko ajuda a encontrar.</h2>
                <Theme>
                    <Tab />
                </Theme>
                <div className="my-4">
                    <div className={`mb-4 ${styles.realStateCardsContainer}`}>
                        {
                            realState?.map((_, index) => (
                                <Cards index={index+1}/>
                            ))
                        }
                    </div>
                    <div>
                        <Link to={'/filters'} className="d-flex align-items-center gap-2 text-decoration-none text-default-color my-4">
                            <span>Ver mais</span>
                            <ArrowRight02Icon />
                        </Link>
                    </div>
                </div>
                <div className="row align-items-center my-4">
                    <div className="col-4 border border-1 w-25">
                        
                    </div>
                    <div className="col-2 d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center justify-content-center rounded-3 px-2" style={{backgroundColor: '#FCF7EA'}}>
                        <WinkIcon color="#D28920" />
                        </div>
                        <p className="m-0">Dúvidas? Fale Conosco</p>
                        <ArrowRight03Icon  color="#D28920"/>
                    </div>
                    <div className="col-5 border border-1 w-50">
                    </div>
                </div>
                <div className="mb-4">
                    <div className="d-flex justify-content-center mb-4">
                        <RandomText text='SÓ FALTA VOCÊ' textColor='#3541A9' borderRadius={'rounded-5'} backgroundColor={'#EDEFFD'} icon={<FavouriteCircleIcon size={16} color="#3541A9"/>}/> 
                    </div>
                    <h1 className="text-center mb-4">Confira o que podemos fazer por você</h1>
                    <div className="row gap-5">
                        {
                            publicityCards.map((item, index) => (
                                <PublicityCards key={index} icon={item.icon} text={item.text} title={item.title}/>                                
                            ))
                        }
                        
                    </div>
                </div>
                <div className="d-flex mb-4">
                    <RandomText text='FAÇA PARTE VOCÊ TAMBÉM' textColor={"#D28920"} borderRadius={'rounded-5'} backgroundColor={'#FCF7EA'} icon={<UserSearch02Icon size={16} color="#D28920"/>}/>
                </div>
                <div>
                    <FeaturedProperties />
                </div>
                <div>
                    <h1 className="text-center display-1" style={{fontWeight: '500'}}>Destaque o seu <span className="text-default-color">imóvel</span></h1>
                    <p className="text-center my-3" style={{
                        fontSize: '18px'
                    }}>
                        Transforme seu imóvel em uma estrela! Com nosso sistema de patrocínio, Sua <br /> propriedade aparece em destaque para milhares de compradores qualificados.
                    </p>
                    <div className="container-fluid">
                        <div className="row gx-5 my-5 px-5">
                            <div className="col-lg-4 shadow-lg rounded-4 px-4 py-4">
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
                                    backgroundColor: '#FDEFE1',
                                    color: '#F4983F'
                                }}>
                                    <p className="">1000AOA / 24h</p>
                                    <p className="m-0">por dia de destaque</p>
                                </div>
                                <button type="button" className="btn btn-warning text-white w-100 py-2">Destacar agora</button>
                            </div>
                            <div className={`${styles.highlightPropertyImages} col-lg-8`}>
                                <div className="border"></div>
                                <div className="border"></div>
                                <div className="border"></div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="my-5" >
                    <h1 className="text-center display-4" style={{fontWeight: '500'}}>Planos que crescem com você</h1>
                    <p className="text-center text-secondary mt-1 mb-5" style={{
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