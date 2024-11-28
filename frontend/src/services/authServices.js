import Cookies from 'js-cookie';

const API_PROTOCOL = process.env.REACT_APP_API_PROTOCOL ;
const API_HOST = process.env.REACT_APP_API_HOST;
const API_PORT = process.env.REACT_APP_API_PORT;

const API_URL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}`;

export const signup = async (newUSer) =>{
    
    try {
        const response = await fetch(`${API_URL}/user`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUSer)
        });

        if(!response.ok){
            throw new Error('Error')
        }

        const data = await response.json();
        Cookies.set('authToken', data.token,{sameSite:'Strict'})
        
        return data;
    } catch (error) {
        throw error;
    }
};

export const login = async (dataUSer) =>{
    
    try {
        const response = await fetch(`${API_URL}/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataUSer)
        });

        if(!response.ok){
            throw new Error('Error')
        }

        const data = await response.json();
        Cookies.set('authToken', data.token,{sameSite:'Strict'})
        
        return data;
    } catch (error) {
        throw error;
    }
};