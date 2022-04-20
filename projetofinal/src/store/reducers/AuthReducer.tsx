import { AuthDTO } from "../../models/AuthDTO";

export const INITIAL_STATE = {
    auth: {
        login: '',
        senha: '',
        token: '',
        loading: true
    }
}

const AuthReducer = (state: AuthDTO = INITIAL_STATE, action: any) => {
    if(action.type === 'SET_TOKEN') {
        return {
            ...state,
            auth: {
                login: action.login,
                senha: action.senha,
                token: action.token,
                loading: false
            }
            
        }
        
    }
    console.log(state);
    return state;

}

export default AuthReducer;