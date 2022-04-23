import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { UsersCreateDTO } from "../../models/UsersCreateDTO";

export const registerUser = async (dispatch: AppDispatch, values: UsersCreateDTO['user'], navigate: NavigateFunction ) => {

    const formData = new FormData()

    formData.append('email', values.email)
    formData.append('name', values.name)
    formData.append('password', values.password)
    formData.append('profilePhoto', values.profilePhoto)
   
   
    try {

        const { data } = await api.post('/user/register', formData);
        
        const user = {
            type: 'SET_USER',
            user: data
        }
        
        dispatch(user);
        
        navigate('/');

    } catch (error) {
        console.log(error);
        
    }
}