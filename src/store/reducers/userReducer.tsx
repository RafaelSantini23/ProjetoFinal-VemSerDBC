import { AnyAction } from "redux"
import { UsersCreateDTO } from "../../models/UsersCreateDTO"


export const INITIAL_STATE = {
    user: {
        email: '',
        login: '',
        password: '',
        profilePhoto: '' 
    },
    loading: true,
    navigateTo: false,
}

const userReducer = (state: UsersCreateDTO = INITIAL_STATE, action: AnyAction) => {
    if (action.type === 'SET_USER') {
        return {
            ...state,
            user: action.user,
            loading: false
        }
    }


    if(action.type === 'CHANGE_BUTTON') {
        return {
            ...state,
            navigateTo: action.navigateTo
        }
    }

    return state
}

export default userReducer;