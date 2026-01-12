import { useState, createContext } from "react";

export const AppContext = createContext()

export default function AppProvider({children}){

    var [showModal, setShowModal] = useState(false)
    var handleShowModal = () => setShowModal(!showModal)
    var [showLocalModal, setShowLocalModal] = useState('')
    var [isLogged, setIsLogged] = useState(true)

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