import { useState } from "react";
import { ArrowDown01Icon, GridViewIcon, Menu07Icon, Search01Icon } from "hugeicons-react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Slider } from "primereact/slider";
import FilterSelect from "./filterSelect/filterSelect";
import styles from './filterPage.module.css'
import RecentSearchs from "../../components/recentSearchs/recentSearchs";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";

export default function FilterPage(){

    const [rangePrice, setRangePrice] = useState(25000);
    const [pageSize, setPageSize] = useState(1)
    const filterSelectsArray = [
        {
            name: 'Tipologia',
            option: ['T1', 'T2', 'T3']
        },
        {
            name: 'Alugar imóveis',
            option: ['Alugar imóveis', 'Comprar imóveis']
        },
        {
            name: 'Apartamento',
            option: ['Apartamento', 'Fazenda', 'Vivenda', 'Residência']
        }
    ]
    const realstates =[
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
    return(
        <>
            <Header />
            <div className="px-5">
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
                        <span className="text-secondary">3 filtros aplicados:</span>
                        <a href="#" className="text-black">Limpar tudo</a>
                    </div>
                </div>
                <div className="d-flex gap-4 w-100 my-4">
                    <aside className="w-25">
                        <h3 className="mb-4">Filtros</h3>
                        <form action="#">
                            <div className="d-flex align-items-center position-relative">
                                <input type="text" className="form-control shadow-none" placeholder="Digite cidade, municípios, ou bairros" style={{padding: '8px 35px'}} />
                                <Search01Icon size={16} className="position-absolute" style={{left: '10px'}}/>
                            </div>
                            <div className="d-flex flex-column gap-3 mt-3">
                                {
                                    filterSelectsArray.map((filter) =>(
                                        <FilterSelect name={filter.name} options={filter.option}/>
                                    ))
                                }
                            </div>
                            <div className="card border border-0 my-4 d-flex justify-content-center">
                                <label htmlFor="preco">Preço do imóvel</label>
                                <Slider value={rangePrice} onChange={(e) => setRangePrice(e.value)} max={25000000} className="w-14rem my-3" />
                                <p className="m-0"><span className="text-secondary">Preço: </span>25.000 kz - {rangePrice.toLocaleString('pt-BR')} kz</p>
                            </div>
                            <button type="submit" className="btn btn-warning text-white w-100">Aplicar filtro</button>
                        </form>
                    </aside>
                    <div className={`${styles.cardsContainer} w-75 h-100`}>
                        {
                            realstates.map((realState) => (
                                <div className="border border-1 rounded-2 d-flex justify-content-center align-items-center" style={{height: '330px'}}>
                                    {
                                        realState.id
                                    }
                                </div>
                            ))
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