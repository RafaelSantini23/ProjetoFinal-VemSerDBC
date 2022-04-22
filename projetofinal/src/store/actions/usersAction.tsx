import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { UsersCreateDTO } from "../../models/UsersCreateDTO";

export const registerUser = async (dispatch: AppDispatch, values: UsersCreateDTO['user'], navigate: NavigateFunction ) => {
    console.log('Entrei na função');
    
    try {
        console.log('Entrei no try');

        const { data } = await api.post('/user/register', values);

        const user = {
            type: 'SET_USER',
            user: data
        }
        console.log(data);
        
        
        dispatch(user);

        navigate('/');

    } catch (error) {
        console.log(error);
        
    }
}