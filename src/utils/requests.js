import { toast } from "react-toastify";
import { getDataFromStorage, setDataIntoStorage } from "./storage";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function signUser(data, setIsLoading, navigate, endpoint){
    setIsLoading(true);
    try {
        const response = await fetch(BASE_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
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
            accessToken: result.accessToken
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

export async function logout(){
    try {
        const response = await fetch(BASE_URL + '/auth/logout', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro de validação. Verifique seus dados e tente novamente.');
            return;
        }

        const result = await response.json();
        console.log("result: ", result)
        window.location.reload()
        return result
    } catch (error) {
        toast.error(error.message || 'Ocorreu um erro. Por favor, tente novamente.');
        return null
    } 
    
    // finally {
    //     setIsLoading(false);
    // }
}

export async function refreshToken(){
    try {
        const response = await fetch(BASE_URL + '/auth/refresh', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }
        const result = await response.json();
        console.log("Resultado do refresh: ",result)
        setDataIntoStorage('user', {
            email: getDataFromStorage('user').email,
            accessToken: result.refreshAcess.accessToken
        })
        return result.refreshAcess.accessToken
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null
    }
}

export async function assumeOwner() {
    try {

        let response = await fetch(BASE_URL + '/assume-roles/owner', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}`
            },
            credentials: 'include'
        });

        // se token expirou
        if (response.status === 401) {

            const newAcessToken = await refreshToken();
            response = await fetch(BASE_URL + '/assume-roles/owner', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${newAcessToken}`
                },
                credentials: 'include'
            });
        }

        if (!response.ok) {
            const errorData = await response.json();

            throw new Error(
                errorData.message ||
                'Algo deu errado no Assume Owner.'
            );
        }

        const result = await response.json();
        return result
        console.log(result);

    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function verifyIndividualOwner(data, setIsLoading, endpoint){
    setIsLoading(true);
    console.log("verify: ", data)
    try {
        const response = await fetch(BASE_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}`
            },
            body: JSON.stringify(data)
        });


        if(response.status === 401){
            const newAcessToken = await refreshToken();
            response = await fetch(BASE_URL + endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${newAcessToken}`
                },
                body: JSON.stringify(data)
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.message || 'Erro de validação. Verifique seus dados e tente novamente.');
            return
        }

        const result = await response.json()
        await assumeOwner()
        await refreshToken()
        return result

    } catch (error) {
        toast.error(error.message || 'Ocorreu um erro. Por favor, tente novamente.');
        return null
    } finally {
        setIsLoading(false);
    }
}

export async function registerProperty(payload, setIsLoading, navigate){

    const formData = new FormData()
    Object.entries(payload).forEach(([key, value]) => {

        if (key === 'images' || key === 'video') return;

        // Apenas compartments deve ser JSON string
        if (key === 'compartments') {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, String(value));
        }
    });

    payload.images.forEach(image => {
        formData.append('images', image)
    })

    if(payload.video.length > 0) {
        payload.video.forEach(video => {
            formData.append('video', video)
        })
    }else{
        formData.delete('video')
    }

    setIsLoading(true);
    
    try {
        const response = await fetch(BASE_URL + '/properties', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log("errodata: ", errorData)
            throw new Error(errorData.message || 'Erro de validação. Verifique seus dados e tente novamente.');
        }

        const result = await response.json()
        console.log("Resultado: ", result)
        const publishResult = await publishProperty(result?.property?.property?.id, navigate)
        console.log("Publicado: ", publishResult)
        toast.success('Imóvel cadastrado com sucesso!');
        return result
    } catch (error) {
        toast.error(error.message || 'Ocorreu um erro. Por favor, tente novamente.');
        return null
    } finally {
        setIsLoading(false);
    }
}

export async function publishProperty(id, navigate){

    try {
        const response = await fetch(BASE_URL + `/properties/publish/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.message || 'Erro de validação. Verifique seus dados e tente novamente.');
            return
        }

        const result = await response.json()
        navigate("/my-profile/my-properties")
        console.log("Publicado com sucesso: ", result)
        return result

    } catch (error) {
        toast.error(error.message || 'Ocorreu um erro. Por favor, tente novamente.');
        return null
    } 
}

export async function getMyProperties(setProperties, setIsLoading, cursor = 0, limit = 20){
    setIsLoading(true)
    try {
        let response = await fetch(BASE_URL + '/properties/owner?limit=20&cursor=0', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}`
            },
            credentials: 'include'
        });

        if (response.status === 401) {
            const newAcessToken = await refreshToken();
            response = await fetch(BASE_URL + '/properties/owner?limit=20&cursor=0', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${newAcessToken}`
                },
                credentials: 'include'
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.message || 'Erro de validação. Verifique seus dados e tente novamente.');
            return
        }
        
        const result = await response.json();
        setProperties(result.properties)
        console.log(result)
        return result

    } catch (error) {
        console.error('Error refreshing token:', error);
        return null
    } finally {
        setIsLoading(false)
    }
}

export async function getAllProperties(setIsLoading, setAllProperties){
    setIsLoading(true)

    try{
        let response = await fetch(BASE_URL + '/properties/listings', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}`
            },
            credentials: 'include'
        });

        if (response.status === 401) {
            const newAcessToken = await refreshToken();
            response = await fetch(BASE_URL + '/properties/listings', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${newAcessToken}`
                },
                credentials: 'include'
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.message || 'Erro de validação. Verifique seus dados e tente novamente.');
            return
        }
        
        const result = await response.json();
        setAllProperties(result.properties)
        console.log(result)
        return result

    } catch(error) {
        toast.error(error.message || 'Ocorreu um erro. Por favor, tente novamente.');
        return null
    }finally{
        setIsLoading(false)
    }
}
export async function getPropertyDetails(setIsLoading, setPropertyDetails, id){
    setIsLoading(true)

    try{
        let response = await fetch(BASE_URL + `/properties/listings/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}`
            },
            credentials: 'include'
        });

        if (response.status === 401) {
            const newAcessToken = await refreshToken();
            response = await fetch(BASE_URL + '/properties/listings', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${newAcessToken}`
                },
                credentials: 'include'
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.message || 'Erro de validação. Verifique seus dados e tente novamente.');
            return
        }
        
        const result = await response.json();
        setPropertyDetails(result.property.property)
        console.log(result)
        return result

    } catch(error) {
        toast.error(error.message || 'Ocorreu um erro. Por favor, tente novamente.');
        return null
    }finally{
        setIsLoading(false)
    }
}
export async function getPropertiesFilter(setIsLoading, setPropertiesFilter, filterFields, limit = 10, cursor = 0){
    setIsLoading(true)

    try{
        let response = await fetch(BASE_URL + `/properties/listings/search${filterFields ? `?limit=${limit}&cursor=${cursor}&${filterFields}`: ''}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}`
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.message || 'Erro de validação. Verifique seus dados e tente novamente.');
            return
        }
        
        const result = await response.json();
        setPropertiesFilter(result.properties)
        console.log(result)
        return result

    } catch(error) {
        toast.error(error.message || 'Ocorreu um erro. Por favor, tente novamente.');
        return null
    }finally{
        setIsLoading(false)
    }
}
export async function makeProposal(setIsLoading, data){
    console.log('entrou')
    setIsLoading(true)

    try{
        let response = await fetch(BASE_URL + `/negotiatons/init`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}`
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.message || 'Erro de validação. Verifique seus dados e tente novamente.');
            return
        }
        
        const result = await response.json();
        console.log(result)
        return result

    } catch(error) {
        toast.error(error.message || 'Ocorreu um erro. Por favor, tente novamente.');
        return null
    }finally{
        setIsLoading(false)
    }
}