
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { AuthDTO } from "../../models/AuthDTO";

export const handleLogin = async (dispatch: AppDispatch, values: AuthDTO['auth'], navigate: NavigateFunction ) => {
    console.log(values);
    
    try {
        const { data } = await api.post('/auth', values);
        
        console.log(data);
        

        const user = {
            type: 'SET_TOKEN',
            auth: {
                login: values.login,
                senha: values.senha,
                token: 'dasdsadasdasdasd', 
                loading: false
            }
        }
        
        dispatch(user);  
        navigate("/campanhas")
    } catch (error) {
        console.log(error);
        
    }

    
}