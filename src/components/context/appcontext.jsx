import { useState, createContext } from "react";
import { get } from "react-hook-form";
import { getDataFromStorage } from "../../utils/storage";

export const AppContext = createContext()

export default function AppProvider({children}){

    var [showModal, setShowModal] = useState(false)
    var handleShowModal = () => setShowModal(!showModal)
    var [showLocalModal, setShowLocalModal] = useState('')
    var [isLogged, setIsLogged] = useState(getDataFromStorage('user') ? true : false)

    return(
        <AppContext.Provider value={{
            showModal,
            handleShowModal,
            showLocalModal,
            setShowLocalModal,
            isLogged,
        }}>
            {children}
        </AppContext.Provider>
    )

}