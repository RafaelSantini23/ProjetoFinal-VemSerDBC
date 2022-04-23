import { AnyAction} from "redux";
import { FundraiserDTO } from "../../models/FundraiserDTO";

export const INITIAL_STATE = {
    campaign: {
        automaticClose: true,
        categories: [],
        validdate: '',
        coverPhoto: '',
        description: '',
        goal: 0,
        title: ''
    }
}

const fundraiserReducer = (state: FundraiserDTO = INITIAL_STATE, action: AnyAction) => {
    if(action.type === 'SET_CAMPAIGN') {
        return {
            ...state,
            campaign: action.campaign
        }
    }
    return state;
}

export default fundraiserReducer;