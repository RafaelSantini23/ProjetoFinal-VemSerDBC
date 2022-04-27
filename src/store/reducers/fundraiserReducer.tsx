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
        title: '',
        contributors: [],
        fundraiserId: 0,
    },
    categoryList: [],
    donate: {
        message: '',
        value: 0
    },
    campaignList: [],
    loading: true,
    loadingDetails: true,
}

const fundraiserReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if(action.type === 'SET_CAMPAIGN') {
        return {
            ...state,
            campaign: action.campaign,
            loadingDetails: action.loadingDetails,
            categoryList: action.categoryList,
        }
    }

    if(action.type === 'SET_DONATE') {
        return {
            ...state,
            donate: action.donate
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