import { useEffect, useState } from "react";
import { ArrowDown01Icon, GridViewIcon, Menu07Icon, Search01Icon } from "hugeicons-react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Slider } from "primereact/slider";
import FilterSelect from "./filterSelect/filterSelect";
import styles from './filterPage.module.css'
import RecentSearchs from "../../components/recentSearchs/recentSearchs";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { getPropertiesFilter } from "../../utils/requests";
import Cards from "../../components/cards/cards";
import SpinnerLoading from "../../components/spinner/spinner";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function FilterPage(){

    const navigate = useNavigate()
    const [rangePrice, setRangePrice] = useState(25000);
    const [pageSize, setPageSize] = useState(1)
    const filterSelectsArray = [
        {
            name: 'type_of_purchase',
            label: 'Propósito',
            option: ['FOR_RENT', 'FOR_SALE']
        },
        {
            name: 'municipality',
            label: 'Município',
            option: [
                'Belas',
                'Cacuaco',
                'Camama',
                'Cazenga',
                'Hoji Ya Henda',
                'Ingombota',
                'Kilamba-Kiaxi',
                'Kilamba',
                'Maianga',
                'Mulenvos',
                'Mussulo',
                'Rangel',
                'Samba',
                'Sambizanga',
                'Talatona',
                'Viana',
            ]
        },
        {
            name: 'type_of_property',
            label: 'Tipo de propriedade',
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
    const realstates = [
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        },
        {
            id: 4
        },
        {
            id: 5
        },
        {
            id: 6
        },
        {
            id: 7
        },
        {
            id: 8
        },
        {
            id: 9
        },
        {
            id: 10
        }
    ] 
    const [filtersLength, setFiltersLength] = useState(0)
    const [propertyFilter, setPropertyFilter] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const filterSchema = z.object({
        type_of_property: z.string().optional(),
        type_of_purchase: z.string().optional(),
        municipality: z.string().optional(),
        is_negotiable: z.preprocess(
            (val) => val === "true" ? true : val === "false" ? false : undefined,
            z.boolean().optional()
        )
    }).refine(
        (data) => {
            return (
            data.type_of_property ||
            data.type_of_purchase ||
            data.municipality ||
            data.is_negotiable !== undefined
            );
        },
        {
            message: "Selecione pelo menos um filtro",
            path: ["root"],
        }
    )
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            type_of_property : '',
            type_of_purchase: '',
            municipality: ''
        }
    })
    const onSubmit = async (data) => {
        if(rangePrice != 25000)
            data['max_price'] = rangePrice.toString()

        const hasAnyFilter = Object.values(data).some((v) => {
            return v !== "" && v !== null && v !== undefined;
        });

        if (!hasAnyFilter) {
            toast.error("Selecione pelo menos um filtro")
            return
        }

        const cleanedData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => {
                return v !== "" && v !== null && v !== undefined;
            })
        );
        const queryString = new URLSearchParams(cleanedData).toString()
        await getPropertiesFilter(setIsLoading, setPropertyFilter, queryString)
        setFiltersLength(Object.keys(cleanedData).length)
        console.log("Filter object:", cleanedData, queryString)
    }
    const onError = () => {
        toast.error("Preencha os campos corretamente")
    }

    useEffect(() => {
        getPropertiesFilter(setIsLoading, setPropertyFilter)
    }, [])
    console.log(errors)
    return(
        <>
            <Header />
            <div 
                className="px-5"
                style={{
                    marginTop: '80px'
                }}    
            >
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center my-3 py-2 px-3 border rounded-3">
                        <div className="d-flex align-items-center gap-2 ">
                            <Menu07Icon />
                            <GridViewIcon />
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <Dropdown>
                                <Dropdown.Toggle className={`${styles.dropdown} d-flex align-items-center gap-2 bg-white text-black border-0 outline-none" id="dropdown-basic`}>
                                    Mostrar:
                                    <span>{pageSize}</span>
                                    <ArrowDown01Icon />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        [...Array(10)].map((_, i) => (
                                            <Dropdown.Item href="#" key={`${i + 1}`} className="bg-white text-black" onClick={(e) => {
                                                e.preventDefault()
                                                setPageSize(i+1)
                                            }}>{
                                                i + 1}
                                            </Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                        <span className="text-secondary">{filtersLength > 1 ? `${filtersLength} filtros aplicados` : `${filtersLength} filtro aplicado`}:</span>
                        <p 
                            className="text-black m-0 text-decoration-underline cursor-pointer"
                            onClick={() => {
                                getPropertiesFilter(setIsLoading, setPropertyFilter)
                                setFiltersLength(0)
                                reset()
                            }}
                        >
                            Limpar tudo
                        </p>
                    </div>
                </div>
                <div className="d-flex gap-4 w-100 my-4">
                    <aside 
                        className="w-25 position-sticky bg-white"
                        style={{
                            top: '100px',
                            height: 'fit-content'
                        }}
                    >
                        <h3 className="mb-4">Filtros</h3>
                        <form 
                            action="#"
                            onSubmit={handleSubmit(onSubmit, onError)}
                        >
                            <div className="d-flex align-items-center position-relative">
                                <input type="text" className="form-control shadow-none" placeholder="Digite cidade, municípios, ou bairros" style={{padding: '8px 35px'}} />
                                <Search01Icon size={16} className="position-absolute" style={{left: '10px'}}/>
                            </div>
                            <div className="d-flex flex-column gap-3 mt-3">
                                {
                                    filterSelectsArray.map((filter) =>(
                                        <FilterSelect 
                                            name={filter.name}
                                            label={filter.label} 
                                            options={filter.option}
                                            register={register}
                                        />
                                    ))
                                }
                            </div>
                            <div className="card border border-0 my-4 d-flex justify-content-center">
                                <label htmlFor="preco">Preço do imóvel</label>
                                <Slider value={rangePrice} onChange={(e) => setRangePrice(e.value)} max={25000000} className="w-14rem my-3" />
                                <p className="m-0"><span className="text-secondary">Preço: </span>25.000 kz - {rangePrice.toLocaleString('pt-BR')} kz</p>
                            </div>
                            <button type="submit" className="btn bg-default-color text-white w-100">Aplicar filtro</button>
                        </form>
                    </aside>
                    <div 
                        className={`${styles.cardsContainer} w-75 h-100`}        
                    >
                        {
                            isLoading ? (
                                <div 
                                    className="w-100 d-flex justify-content-center align-items-end"
                                    style={{
                                        height: '30vh'
                                    }}
                                >
                                    <SpinnerLoading
                                        width={'5'}
                                        height={'5'}
                                    />
                                </div>
                            ) : (
                                propertyFilter.length > 0 ? (
                                     propertyFilter?.map((property, index) => (
                                        <Cards 
                                            index={index}
                                            data={property.property}
                                        />
                                    ))
                                ) : (
                                    <div 
                                        className="w-100 d-flex justify-content-center align-items-end"
                                        style={{
                                            height: '33vh'
                                        }}
                                    >
                                        <h1 className="fw-semibold display-4">Ups! Sem resultados ...</h1>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
                <div className="py-5 px-4">
                    <RecentSearchs />
                </div>
            </div>
            <Footer />
        </>
    )
}