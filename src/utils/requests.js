import { toast } from "react-toastify";
import { setDataIntoStorage } from "./storage";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function signUser(data, setIsLoading, navigate, endpoint){
    console.log("Dados enviados: ", data)
    setIsLoading(true);
    try {
        const response = await fetch(BASE_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }

        const result = await response.json();
        setDataIntoStorage('user', {
            email: result.user.email,
            token: result.accessToken
        })
        navigate('/')
        console.log(result);
    } catch (error) {
        console.error(error);
        toast.error('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
    } finally {
        setIsLoading(false);
    }
}