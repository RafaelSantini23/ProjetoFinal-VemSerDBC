
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { AuthDTO } from "../../models/AuthDTO";

export const handleLogin = async (dispatch: AppDispatch, values: AuthDTO['auth'], navigate: NavigateFunction ) => {
    
    try {
        const { data } = await api.post('/auth', values);
        
        const user = {
            type: 'SET_TOKEN',
            auth: {
                login: values.login,
                password: values.password,
                isLogged: true,
                token: data, 
                loading: false
            }
        }
        
        dispatch(user); 

        localStorage.setItem('token', data);

         api.defaults.headers.common['Authorization'] = data;

        navigate('/campanhas');

    } catch (error) {
        console.log(error);
        
    }

    
}


export const handleLogout = (dispatch: AppDispatch, navigate: NavigateFunction) => {
    
    const user = {
        type: 'SET_TOKEN',
        auth: {
            login: '',
            password: '',
            isLogged: false,
            token: '', 
            loading: false
        }
    }

    localStorage.removeItem('token');

    dispatch(user); 
    
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



