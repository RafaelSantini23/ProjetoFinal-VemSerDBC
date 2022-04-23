import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { UsersCreateDTO } from "../../models/UsersCreateDTO";

export const registerUser = async (dispatch: AppDispatch, values: any, navigate: NavigateFunction ) => {
    console.log('Entrei na função');
    const formData = new FormData();

    try {
        console.log('Entrei no try');
        formData.append('profilePhoto', values.profilePhoto)
        formData.append('email', values.email )
        formData.append('name', values.name )
        formData.append('password', values.password )

        console.log(values);
        const { data } = await api.post('/user/register', formData);
        
        
        const user = {
            type: 'SET_USER',
            user: data
        }

        dispatch(user);

        console.log(user);
        

        navigate('/')
    } catch (error) {
        console.log(error);
        
    }
}