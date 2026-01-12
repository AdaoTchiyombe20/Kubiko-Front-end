import RandomText from "../randomTextAndSvg/randomText"
import { Home13Icon } from "hugeicons-react"
export default function RecentSearchs(){
    return(
        <div>
            <div className="mb-4">
                <h2 className="m-0" style={{fontFamily: 'Parkinsans'}}>Pesquisas mais recentes</h2>
                <small className="text-secondary m-0">O que as pessoas estão procurando mais no Kubiko</small>
            </div>
            <div className="d-flex flex-wrap gap-3 mb-4">
                <RandomText text='Casa para alugar em Talatona' textColor={"#323131"} backgroundColor={'#FFFFFF'} boxShadow={true} icon={<Home13Icon size={16} color="#3541A9"/>}/>
                <RandomText text='Apartamento para alugar no Kilamba' textColor={"#323131"} backgroundColor={'#FFFFFF'} boxShadow={true} icon={<Home13Icon size={16} color="#3541A9"/>}/>
                <RandomText text='Casa para alugar em Luanda Sul' textColor={"#323131"} backgroundColor={'#FFFFFF'} boxShadow={true} icon={<Home13Icon size={16} color="#3541A9"/>}/>
                <RandomText text='Apartamento à venda no Benfica' textColor={"#323131"} backgroundColor={'#FFFFFF'} boxShadow={true} icon={<Home13Icon size={16} color="#3541A9"/>}/>
                <RandomText text='Casa para alugar em Luanda Sul' textColor={"#323131"} backgroundColor={'#FFFFFF'} boxShadow={true} icon={<Home13Icon size={16} color="#3541A9"/>}/>
                <RandomText text='Casa para alugar em Luanda Sul' textColor={"#323131"} backgroundColor={'#FFFFFF'} boxShadow={true} icon={<Home13Icon size={16} color="#3541A9"/>}/>
                <RandomText text='Casa para alugar em Luanda Sul' textColor={"#323131"} backgroundColor={'#FFFFFF'} boxShadow={true} icon={<Home13Icon size={16} color="#3541A9"/>}/>
                <RandomText text='Casa para alugar em Luanda Sul' textColor={"#323131"} backgroundColor={'#FFFFFF'} boxShadow={true} icon={<Home13Icon size={16} color="#3541A9"/>}/>
                <RandomText text='Apartamento para alugar em Maianga' textColor={"#323131"} backgroundColor={'#FFFFFF'} boxShadow={true} icon={<Home13Icon size={16} color="#3541A9"/>}/>
            </div>
        </div>  
    )
}