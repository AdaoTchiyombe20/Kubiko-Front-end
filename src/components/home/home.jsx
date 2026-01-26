import Carrousel from "../carousel/carousel";
import Cards from "../cards/cards";
import RandomText from "../randomTextAndSvg/randomText";
import PublicityCards from "../publicityCards/publicityCards";
import Tab from "../tab/tab";
import RecentSearchs from "../recentSearchs/recentSearchs";
import { ArrowRight03Icon, City03Icon, FavouriteCircleIcon, Home12Icon, Home13Icon, PinLocation03Icon, Search01Icon, SearchingIcon, SolidLine01Icon, UserSearch02Icon, WinkIcon } from "hugeicons-react";
import { Theme } from "@radix-ui/themes";
import styles from './home.module.css'
import { Form } from "react-bootstrap";
import VariousModal from "../modal/modal";

export default function Home(){
    return(
        <>
            <div className="d-flex flex-column pb-4 position-relative mb-5">
                <Carrousel />
                <div className={`${styles.aboveCarrousel} h-100 w-100 d-flex flex-column justify-content-between align-items-center position-absolute`}>
                    <div>
                        <h2 className="text-white text-center mb-5">Bem ao <span className="text-warning">Kubiko</span></h2>
                        <h1 className="text-center lh-1 text-warning">Invista Hoje no <br /> Sonho da sua casa</h1>
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
                            <button className="btn btn-warning text-white w-100 d-flex justify-content-center align-items-center gap-3 rounded-3">
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
                    <div className="row mb-4 realStateCards">
                        <Cards />
                        <Cards />
                        <Cards />
                        <Cards />
                        <Cards />
                    </div>
                    <div className="row realStateCards">
                        <Cards />
                        <Cards />
                        <Cards />
                        <Cards />
                        <Cards />
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
                        <PublicityCards icon={<Home12Icon color="#ffff" />} text={"Pesquise casas, apartamentos, terrenos e espaços comerciais com informações completas, fotos reais e dados verificados"} title={"Encontre imóveis com confiança"}/>
                        <PublicityCards icon={<SearchingIcon color="#ffff" />} text={"Cada imóvel passa por um processo de validação para reduzir fraudes e anúncios falsos. Mais segurança para quem procura, mais credibilidade para quem anuncia."} title={"Anúncios validados e transparentes"}/>
                        <PublicityCards icon={<PinLocation03Icon color="#ffff"/>} text={"Encontre imóveis por município, bairro ou zona específica.Ideal para quem já sabe onde quer morar ou investir, sem perder tempo."} title={"Busca inteligente por localização"}/>
                    </div>
                </div>
                <div className="d-flex mb-4">
                    <RandomText text='FAÇA PARTE VOCÊ TAMBÉM' textColor={"#D28920"} borderRadius={'rounded-5'} backgroundColor={'#FCF7EA'} icon={<UserSearch02Icon size={16} color="#D28920"/>}/>
                </div>
                <RecentSearchs />
            </main>
        </>
    )
}