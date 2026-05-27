import { useState, createContext } from "react";
import { getDataFromStorage } from "../../utils/storage";

export const AppContext = createContext()

export default function AppProvider({children}){

    const [showModal, setShowModal] = useState(false)
    const [showLocalModal, setShowLocalModal] = useState('')
    const [isLogged, setIsLogged] = useState(getDataFromStorage('user') ? true : false)
    const [ownerVerificationVersion, setOwnerVerificationVersion] = useState(0)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)
    const notifyOwnerVerified = () => setOwnerVerificationVersion(version => version + 1)

    return(
        <AppContext.Provider value={{
            showModal,
            setShowModal,
            handleShowModal: openModal,
            openModal,
            closeModal,
            showLocalModal,
            setShowLocalModal,
            isLogged,
            setIsLogged,
            ownerVerificationVersion,
            notifyOwnerVerified
        }}>
            {children}
        </AppContext.Provider>
    )

}
