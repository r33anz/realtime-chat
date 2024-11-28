import Cookies from "js-cookie";

const API_PROTOCOL = process.env.REACT_APP_API_PROTOCOL ;
const API_HOST = process.env.REACT_APP_API_HOST;
const API_PORT = process.env.REACT_APP_API_PORT;

const API_URL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}`;

export const apiClient = async (endpoint,option = {}) =>{
    const token = Cookies.get('authToken')

    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...(token && {Authorization: `Bearer ${token}`}

    )}

    const config = {
        ...option,
        headers:{
            ...defaultHeaders,
            ...option.headers
        }
    }

    const response = await fetch(`${API_URL}${endpoint}`,config)

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error en la solicitud')
    }

    return response.json()
}
