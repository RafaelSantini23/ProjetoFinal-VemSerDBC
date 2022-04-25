import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { UsersCreateDTO } from "../../models/UsersCreateDTO";
import { handleLogin } from "./authAction";

export const registerUser = async (dispatch: AppDispatch, values: UsersCreateDTO['user'], navigate: NavigateFunction ) => {

    const formData = new FormData()

    formData.append('email', values.email)
    formData.append('name', values.login)
    formData.append('password', values.password)
    formData.append('profilePhoto', values.profilePhoto as File)
   
   
    try {

        const { data } = await api.post('/user/register', formData);
        
        const user = {
            type: 'SET_USER',
            user: data
        }
        
        dispatch(user);
        

        const login = {
            login: values.email, 
            password: values.password,
            isLogged: true,
            loading: false
        }

        handleLogin(dispatch, login,  navigate);

    } catch (error) {
        console.log(error);
        
    }
}

