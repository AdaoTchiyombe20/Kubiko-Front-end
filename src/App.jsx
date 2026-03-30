import "./App.css";
import Dropdown from "./components/dropdown/dropdown";
import Footer from "./components/footer/footer";

import { Outlet } from "react-router-dom";
import VariousModal from "./components/modal/modal";
export default function App() {
  return (
    <>
      <VariousModal />
      <Outlet />
    </>
  )
}
