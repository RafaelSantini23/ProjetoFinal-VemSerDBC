
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { AppDispatch } from "..";
import { AuthDTO } from "../../models/AuthDTO";

export const setToken = (dispatch: AppDispatch ) => {
    const user = {
        type: 'SET_TOKEN',
        auth: {
            login: "admin",
            senha: "admin",
            token: "123456789",
            loading: false
        }
    }

    
    
    dispatch(user);  

    
}