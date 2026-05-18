import { toast } from "react-toastify";
import { setDataIntoStorage } from "./storage";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function signUser(data, setIsLoading, navigate, endpoint){
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
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro de validação. Verifique seus dados e tente novamente.');
            return;
        }

        const result = await response.json();
        setDataIntoStorage('user', {
            email: result.user.email,
            token: result.accessToken
        })
        if(navigate)
            navigate('/')
        return result
    } catch (error) {
        toast.error(error.message || 'Ocorreu um erro. Por favor, tente novamente.');
        return null
    } finally {
        setIsLoading(false);
    }
}