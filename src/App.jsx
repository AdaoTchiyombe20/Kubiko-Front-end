import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import VariousModal from "./components/modal/modal";
import { AppContext } from "./components/context/appcontext";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"

export default function App() {

  const {setIsLogged} = useContext(AppContext)

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLogged(true)
    }
  }, [])

  return (
    <>
      <VariousModal />
      <Outlet />
      <ToastContainer />
    </>
  )
}
