import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { UsersCreateDTO } from "../../models/UsersCreateDTO";
import { handleLogin } from "./authAction";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from "notiflix";
import { DispatchProp } from "react-redux";

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
         
        Loading.remove();

        dispatch(user);
        

        const login = {
            login: values.email, 
            password: values.password,
            isLogged: true,
            loading: false
        }

        handleLogin(dispatch, login,  navigate);
        
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
        console.log(userProfile);
        

    } catch (error) {
        
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



