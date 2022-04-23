import { AnyAction } from "redux"
import { UsersCreateDTO } from "../../models/UsersCreateDTO"
import { FileDTO } from "../../models/FileDTO"

export const INITIAL_STATE = {
    user: {
        email: '',
        name: '',
        password: '',
        profilePhoto: ''
    }
}

const userReducer = (state: UsersCreateDTO = INITIAL_STATE, action: AnyAction) => {
    if (action.type === 'SET_USER') {
        return {
            ...state,
            user: action.user
        }
    }

    return state
}

export default userReducer;