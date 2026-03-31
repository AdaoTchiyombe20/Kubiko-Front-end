import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VariousModal from "./components/modal/modal";
import "./App.css"

export default function App() {
  return (
    <>
      <VariousModal />
      <Outlet />
      <ToastContainer />
    </>
  )
}
