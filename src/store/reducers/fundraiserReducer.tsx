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
    campaignListFilter: [],
    loading: true,
    loadingDetails: true,
    loadingDonate: true,
    categorys: [],
    totalPages: 0,
    error: false,
    errorDetails: false,
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

    if(action.type === 'SET_LOADING') {
        return {
            ...state,
            loadingDetails: action.loadingDetails,
            loading: action.loading
        }
    }



    if(action.type === 'SET_DONATE') {
        return {
            ...state,
            donate: action.donate,
            loadingDonate: action.loadingDonate
        }
    }


    if(action.type === 'SET_CAMPAIGN_LIST') {
        return {
            ...state,
            campaignList: action.campaignList,
            campaignListFilter: action.campaignListFilter,
            loading: action.loading,
            totalPages: action.totalPages,
            error: action.error
        }
    }

    if(action.type === 'SET_CATEGORYS') {
        return {
            ...state,
            categorys: action.categorys
        }
    }

    if(action.type === 'SET_ERROR') {
        return {
            ...state,
            error: action.error,
            loading: action.loading
        }
    
    }

    
    return state;
}

export default fundraiserReducer;