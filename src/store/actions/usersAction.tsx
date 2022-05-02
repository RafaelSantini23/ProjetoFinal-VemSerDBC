import { NavigateFunction } from "react-router-dom";
import { Notify } from "notiflix";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { AppDispatch } from "..";
import { UsersCreateDTO } from "../../models/UsersCreateDTO";
import { handleLogin } from "./authAction";
import api from "../../api";


export const registerUser = async (dispatch: AppDispatch, values: UsersCreateDTO['user'], navigate: NavigateFunction ) => {
    Loading.circle();

    const formData = new FormData()

    formData.append('email', values.email)
    formData.append('name', values.login)
    formData.append('password', values.password)
    if(values.profilePhoto) {
        formData.append('profilePhoto', values.profilePhoto as File)
    }

    try {
        const response = await api.post('/user/register', formData);
        
        const user = {
            type: 'SET_USER',
            user: response.data
        }
        
        dispatch(user);
    
        const login = {
            login: values.email, 
            password: values.password,
            isLogged: true,
            loading: false
        }
        
        handleLogin(dispatch, login,  navigate);
        Loading.remove();
        Notify.success('Conta cadastrada com sucesso!')
    } catch (error: any) {
       console.log(error)
        if(error.response) {

            if(error.response.data.message === "Email already exists.") {
                Notify.failure('Email existente!');
            } else {
                Notify.failure('Erro ao cadastrar usuário!');
            }
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        
        Loading.remove()
    
    }
}

export const getUserProfile = async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.get('/user/profile');

        const userProfile = {
            type: 'SET_USER',
            user: data,
            loading: false
        }

        dispatch(userProfile);

    } catch (error) {
        Notify.failure('error ao obter os dados do usuário!')
    }  
}
export const setButton = (dispatch: AppDispatch, condition: boolean, path?: string, navigate?: NavigateFunction) => {
    const newState = {
        type: 'CHANGE_BUTTON',
        navigateTo: condition
    }

    dispatch(newState)
    navigate?.(path as string)
}



