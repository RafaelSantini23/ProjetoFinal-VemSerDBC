import { AnyAction} from "redux";
import { FundraiserDTO } from "../../models/FundraiserDTO";

export const INITIAL_STATE = {
    campaign: {
        automaticClose: true,
        categories: [],
        endingDate: '',
        coverPhoto: '',
        description: '',
        goal: 0,
        title: ''
    },
    donate: {
        message: '',
        value: 0
    }

}

const fundraiserReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if(action.type === 'SET_CAMPAIGN') {
        return {
            ...state,
            campaign: action.campaign
        }
    }

    if(action.type === 'SET_DONATE') {
        return {
            ...state,
            donate: action.donate
        }
    }


    return state;
}

export default fundraiserReducer;