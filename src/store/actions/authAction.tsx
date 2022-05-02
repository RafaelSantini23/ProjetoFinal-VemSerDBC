
import { NavigateFunction } from "react-router-dom";
import { Notify } from "notiflix";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { AppDispatch } from "..";
import { AuthDTO } from "../../models/AuthDTO";
import { UsersCreateDTO } from "../../models/UsersCreateDTO";
import api from "../../api";

export const handleLogin = async (dispatch: AppDispatch, values: AuthDTO['auth'] | UsersCreateDTO['user'], navigate: NavigateFunction ) => {
    Loading.circle()
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
        
        Loading.remove()
        dispatch(user); 

        localStorage.setItem('token', user.auth.token);

        api.defaults.headers.common['Authorization'] = user.auth.token;

        navigate('/campaigns');

    } catch (error) {
        console.log(error);
        Notify.failure('Usuário não encontrado!');
        Loading.remove()
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

export const isAuth = (dispatch: AppDispatch, auth: AuthDTO['auth']) => {

        const user = {
            type: 'IS_LOGGED',
            auth: {
                login: auth.login,
                password: auth.password,
                token: auth.token,
                isLogged: true,
                loading: false
            }
        }

        dispatch(user); 
}



