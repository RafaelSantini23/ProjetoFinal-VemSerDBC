import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { DonateCreateDTO } from "../../models/DonateCreateDTO";
import { FundraiserDTO } from "../../models/FundraiserDTO";
import { FundraiserListDTO } from "../../models/FundraiserListDTO";
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export const createCampaign = async (dispatch: AppDispatch, values: FundraiserDTO['campaign'], navigate: NavigateFunction ) => {
  
    const formData = new FormData()
    
    formData.append('goal', values.goal as string)
    formData.append('endingDate', values.endingDate  as string)
    formData.append('coverPhoto', values.coverPhoto  as string)
    formData.append('description', values.description)
    formData.append('categories', values.categories  as string)
    formData.append('title', values.title)
    formData.append('automaticClose', values.automaticClose  as string)

  try {
      
      const { data } = await api.post('/fundraiser/save', formData);
  
      const campaign = {
          type: 'SET_CAMPAIGN',
          campaign: data
      }

      dispatch(campaign);

      navigate('/campanhas')
  } catch (error) {
      console.log(error); 
  }
}


export const donateForCampaign = async (dispatch: AppDispatch, values: DonateCreateDTO, id?: number) => {
    try {
        const { data } = await api.post('/donation/22', values)

        const donation = {
            type: 'SET_DONATION',
            donation: {
                ...data,
            }
        }
        console.log(data)

        dispatch(donation);


    } catch (error) {
        console.log(error);
    }
}


export const getCampaingOfUser = async (dispatch: AppDispatch, id: number) => {
    Loading.circle()
    try {
        const { data } = await api.get(`/fundraiser/userFundraisers/${id}`)

        const { content } = data
        const campaign = {
            type: 'SET_CAMPAIGN_LIST',
            campaignList: content,
            loading: false
        }

        dispatch(campaign);
        Loading.remove()

    } catch (error) {
        console.log(error);
    }
}


export const getCampaign = async (dispatch: AppDispatch, number: number) => {
    Loading.circle()
    try {
        const { data } = await api.get(`/fundraiser/findAll/${number}`)
        const {content} = data

        const campaignList = {
            type: 'SET_CAMPAIGN_LIST',
            campaignList: content,
            loading: false
        }

        dispatch(campaignList)
        Loading.remove()
    } catch (error) {
        console.log(error)
    }
}