import { AnyAction} from "redux";
import { FundraiserDTO } from "../../models/FundraiserDTO";
import { FundraiserListDTO } from "../../models/FundraiserListDTO";

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
    campaignList: [],
    loading: true
}

const fundraiserReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if(action.type === 'SET_CAMPAIGN') {
        return {
            ...state,
            campaign: action.campaign
        }
    }
    if(action.type === 'SET_CAMPAIGN_LIST') {
        return {
            ...state,
            campaignList: action.campaignList,
            loading: action.loading
        }
    }
    return state;
}

export default fundraiserReducer;