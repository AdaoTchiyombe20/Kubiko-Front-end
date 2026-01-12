import "./App.css";
import Dropdown from "./components/dropdown/dropdown";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import { Outlet } from "react-router-dom";
export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
