import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { Calendar04Icon, Location09Icon } from "hugeicons-react";
import { getMyProperties } from "../../utils/requests";
import house from "../../assets/imgs/house.png"

export default function MyProperties(){

    const [isLoading, setIsLoading] = useState(false)    
    const [properties, setProperties] = useState([])

    useEffect(() => {
        getMyProperties(setProperties, setIsLoading)
    }, [])
    
    console.log(properties)
 
    return(
        <div
            className="px-4"
            style={{
                marginTop: '95px'
            }}
        >
            <h1 className="fw-semibold m-0 text-default-color">Meus Imóveis</h1>
            <p className="text-secondary m-0">Acompanhe o estado das propostas que você enviou</p>
            {
                isLoading ? (
                     <div 
                        className="w-100 d-flex justify-content-center align-items-center"
                        style={{
                            height: '80vh'
                        }}                    
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
                    <div className="mt-4">
                        {
                            properties.length > 0 ?(
                                properties.map((property, index) => (
                                    <div className="d-flex gap-3 border p-4 rounded-3 shadow-sm mb-4">
                                        <div
                                            style={{
                                                width: '340px',
                                                height: '200px'
                                            }}
                                        >
                                            <img 
                                                src={property.property_medias[0].url}
                                                alt=""
                                                className="object-fit-cover w-100 h-100 rounded-2"
                                            />
                                        </div>
                                        <div 
                                            className="d-flex justify-content-between gap-2 px-3 pt-4"
                                            style={{
                                                width: '74%'
                                            }}
                                        >
                                            <div className="d-flex flex-column gap-1">
                                                <div
                                                    style={{
                                                    maxWidth: '290px'
                                                }}
                                                >
                                                    <h3 className="m-0 fw-semibold mb-2 text-default-color text-truncate">{property.title}</h3>
                                                    <p className="text-secondary m-0 d-flex align-items-center gap-2"><span><Location09Icon /></span> Luanda, {property.property_localization.municipality}, {property.property_localization.neighborhood}</p>
                                                </div>
                                                <p className="text-secondary m-0 d-flex align-items-center gap-2"><span><Calendar04Icon /></span> Enviada em: {new Date(property.updated_at).toLocaleString('pt-ao')}</p>
                                            </div>
                                            <div>
                                                <p className="m-0 fs-5 fw-semibold text-default-color">{Number(property.price)?.toLocaleString("pt-AO", {style: 'currency', currency: 'AOA'})}</p>
                                                <p className="text-secondary m-0 d-flex align-items-center gap-2">Valor do imóvel</p>
                                            </div>
                                            <div className="d-flex flex-column gap-2 w-25">
                                                <p
                                                    className="d-flex justify-content-center text-warning fw-semibold rounded-2 border-0 py-2 m-0"
                                                    style={{
                                                        backgroundColor: '#FCF3D5'
                                                    }}
                                                >
                                                    Aluguel
                                                </p>
                                                <button
                                                    className="btn btn-outline-primary fw-semibold border py-2 shadow-sm"
                                                >
                                                    Editar informações
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))) : (
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            height: '60vh'
                                        }}
                                    >
                                        <h1 className="display-4 text-center mt-5 fw-semibold text-default-color">Ainda não tem imóveis cadastrados</h1>
                                    </div>
                                )
                        }
                    </div>
                )
            }       
        </div>
    )
}