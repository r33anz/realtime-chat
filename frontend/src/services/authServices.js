const API_PROTOCOL = process.env.REACT_APP_API_PROTOCOL ;
const API_HOST = process.env.REACT_APP_API_HOST;
const API_PORT = process.env.REACT_APP_API_PORT;

const API_URL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}`;
console.log(API_URL)
export const signup = async (newUSer) =>{
    console.log(API_URL)
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
        console.log(data)
        return data;
    } catch (error) {
        throw error;
    }
};