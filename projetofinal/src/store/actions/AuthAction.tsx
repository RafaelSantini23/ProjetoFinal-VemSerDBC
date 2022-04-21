
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
                isLogged: true,
                token: data, 
                loading: false
            }
        }
        
        dispatch(user); 

        localStorage.setItem('token', data);

         api.defaults.headers.common['Authorization'] = data;

        navigate('/create-campanhas');

    } catch (error) {
        console.log(error);
        
    }

    
}


export const handleLogout = (dispatch: AppDispatch, navigate: NavigateFunction) => {
    
    const user = {
        type: 'SET_TOKEN',
        auth: {
            login: '',
            senha: '',
            isLogged: false,
            token: '', 
            loading: false
        }
    }

    localStorage.removeItem('token');

    dispatch(user); 

    console.log(user);
    
    navigate('/')
}

export const isAuth = (dispatch: AppDispatch) => {

        const user = {
            type: 'IS_LOGGED',
            auth: {
                isLogged: true,
                loading: false
            }
        }

        dispatch(user); 
}

