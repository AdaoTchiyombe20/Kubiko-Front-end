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

export async function refreshToken(){
    try {
        const response = await fetch(BASE_URL + '/auth/refresh', {
            method: 'GET',
            'credentials' : 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }
        const result = await response.json();
        console.log("Resultado do refresh: ",result)
        // setDataIntoStorage('user', {
        //     email: result.user.email,
        //     token: result.accessToken
        // })
        // return result.accessToken
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null
    }
}

export async function assumeOwner(data, setIsLoading, endpoint){
    setIsLoading(true);
    try {
        const response = await fetch(BASE_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.message || 'Erro de validação. Verifique seus dados e tente novamente.');
            return
        }

        const result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        toast.error(error.message || 'Ocorreu um erro. Por favor, tente novamente.');
        return null
    } finally {
        setIsLoading(false);
    }
}


export async function registerProperty(payload, setIsLoading){

    const formData = new FormData()
    Object.entries(payload).forEach(([key, value]) => {
        if(key !== 'images' && key !== 'videos')
            formData.append(key, JSON.stringify(value))
    })

    payload.images.forEach(image => {
        formData.append('images', image)
    })

    if(payload.videos.length > 0) {
        payload.videos.forEach(video => {
            formData.append('video', video)
        })
    }

    setIsLoading(true);
    
    try {
        const response = await fetch(BASE_URL + '/properties', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro de validação. Verifique seus dados e tente novamente.');
        }

        const result = await response.json();
        toast.success('Imóvel cadastrado com sucesso!');
        console.log("Resultado: ", result)
        return result
    } catch (error) {
        toast.error(error.message || 'Ocorreu um erro. Por favor, tente novamente.');
        return null
    } finally {
        setIsLoading(false);
    }
}