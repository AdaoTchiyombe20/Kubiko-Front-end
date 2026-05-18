import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Auth from "../../components/auth/auth";
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";

export default function Sign() {

  const user = localStorage.getItem('user');
  if(user)
    return <Navigate to={"/"} replace={true} />

  return (
    <>
      <ToastContainer />
      <Auth />
    </>
  );
}