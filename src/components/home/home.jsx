import Carrousel from "../carousel/carousel";
import Cards from "../cards/cards";
import { ArrowRight03Icon, City03Icon, FavouriteCircleIcon, Home12Icon, Home13Icon, PinLocation03Icon, SearchingIcon, SolidLine01Icon, UserSearch02Icon, WinkIcon } from "hugeicons-react";
import RandomText from "../randomTextAndSvg/randomText";
import PublicityCards from "../publicityCards/publicityCards";
import { Theme } from "@radix-ui/themes";
import Tab from "../tab/tab";
import RecentSearchs from "../recentSearchs/recentSearchs";

export default function Home(){
    return(
        <>
            <div className="pb-4">
                <Carrousel />
            </div>
            <main className="mb-5">
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