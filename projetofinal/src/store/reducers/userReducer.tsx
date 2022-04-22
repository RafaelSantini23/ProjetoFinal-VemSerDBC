import { AnyAction } from "redux"
import { UsersCreateDTO } from "../../models/UsersCreateDTO"

export const INITIAL_STATE = {
    user: {
        email: '',
        name: '',
        password: '',
        profilePhoto: '',
    }

}

const UserReducer = (state: UsersCreateDTO = INITIAL_STATE, action: AnyAction) => {
    if (action.type === 'SET_USER') {
        return {
            ...state,
            user: action.user
        }
    }

    return state
}

export default UserReducer;