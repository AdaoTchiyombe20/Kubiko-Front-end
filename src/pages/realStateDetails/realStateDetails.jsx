import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { UserSearch02Icon } from "hugeicons-react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import RandomText from "../../components/randomTextAndSvg/randomText";
import RecentSearchs from "../../components/recentSearchs/recentSearchs";
import RealStateDetailsCard from "../../components/realStateDetailsCard/realStateDetailsCard";
import styles from './realStateDetails.module.css'
import { getPropertyDetails } from "../../utils/requests";
import SpinnerLoading from "../../components/spinner/spinner";

export default function RealStateDetails(){

    const { id } = useParams()
    const [propertyDetails, setPropertyDetails] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() =>{
        getPropertyDetails(setIsLoading, setPropertyDetails, id)
    }, [])

    if(isLoading){
        return(
            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    height: '100vh'
                }}
            >
                <SpinnerLoading
                    width={"10"}
                    height={"10"}
                />

            </div>
        )
    }

    return(
        <>
            <Header />
            <div className={`${styles.realStateDetails}`}>
                <RealStateDetailsCard 
                    whatIsThis="realStateDetails"
                    realStateInformations={propertyDetails}
                />
                <h2 className="my-4">Similares na mesma região</h2>
                <div className={`${styles.realStateDetailsContainerCards} container-fluid mb-4`}>
                    {/* <div className={`${styles.realStateContainerCards}`}>
                        {
                            [...Array(5)].map((_, index) => (
                                <Cards index={index+1}/>
                            ))
                        }
                    </div> */}
                </div>
                <div className="d-flex mb-4">
                    <RandomText text='FAÇA PARTE VOCÊ TAMBÉM' textColor={"#10265B"} borderRadius={'rounded-5'} backgroundColor={'#EDEFFD'} icon={<UserSearch02Icon size={16} color="#3541A9"/>}/>
                </div>
                <RecentSearchs />
            </div>
            <Footer />
        </>
    )
}
