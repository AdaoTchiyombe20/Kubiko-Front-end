import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft02Icon, Bathtub01Icon, BedIcon, Building02Icon, Calendar04Icon, Call02Icon, CheckmarkBadge02Icon, Clock05Icon, KitchenUtensilsIcon, Time04Icon, UserSearch02Icon } from "hugeicons-react";
import Cards from "../../components/cards/cards";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { AppContext } from "../../components/context/appcontext"
import RandomText from "../../components/randomTextAndSvg/randomText";
import RecentSearchs from "../../components/recentSearchs/recentSearchs";
import RealStateDetailsCard from "../../components/realStateDetailsCard/realStateDetailsCard";
import styles from './realStateDetails.module.css'

export default function RealStateDetails(){

    const {setShowLocalModal, handleShowModal} = useContext(AppContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [realStateInformations, setRealStateInformation] = useState([])
    console.log(id)

    useEffect(() =>{
        async function realStateDetailShowInformation(){
            const endpoint = `http://localhost:3001/properties/${id}`

            try{
                const data = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'content-type' : 'application/json'
                    }
                })

                const resposta = await data.json()
                setRealStateInformation(resposta)
                console.log(resposta)
            }
            catch(error){
                console.log("Error: ", error)
            }
        }
        realStateDetailShowInformation()
    }, [])
    return(
        <>
            <Header />
            <div className={`${styles.realStateDetails}`}>
                <RealStateDetailsCard whatIsThis="realStateDetails" realStateInformations={realStateInformations} />
                <h2 className="my-4">Similares na mesma região</h2>
                <div className={`${styles.realStateDetailsContainerCards} container-fluid mb-4`}>
                    <div className={`${styles.realStateContainerCards}`}>
                        {
                            [...Array(5)].map((_, index) => (
                                <Cards index={index+1}/>
                            ))
                        }
                    </div>
                </div>
                <div className="d-flex mb-4">
                    <RandomText text='FAÇA PARTE VOCÊ TAMBÉM' textColor={"#D28920"} borderRadius={'rounded-5'} backgroundColor={'#FCF7EA'} icon={<UserSearch02Icon size={16} color="#D28920"/>}/>
                </div>
                <RecentSearchs />
            </div>
            <Footer />
        </>
    )
}