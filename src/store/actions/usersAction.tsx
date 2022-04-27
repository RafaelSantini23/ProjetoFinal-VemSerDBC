import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { UsersCreateDTO } from "../../models/UsersCreateDTO";
import { handleLogin } from "./authAction";
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export const registerUser = async (dispatch: AppDispatch, values: UsersCreateDTO['user'], navigate: NavigateFunction ) => {
    Loading.circle();

    const formData = new FormData()

    formData.append('email', values.email)
    formData.append('name', values.login)
    formData.append('password', values.password)
    formData.append('profilePhoto', values.profilePhoto as File)
    

   
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
       
        if(error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        
        Loading.remove()
    
    }
}



