import { AnyAction} from "redux";
import { AuthDTO } from "../../models/AuthDTO";

export const INITIAL_STATE = {
    auth: {
        login: '',
        senha: '',
        token: '',
        loading: true
    }
}


const AuthReducer = (state: AuthDTO = INITIAL_STATE, action: AnyAction) => {
    if(action.type === 'SET_TOKEN') {
        return {
            ...state,
            auth: action.auth
        }
    }

    return state;

}

export default AuthReducer;