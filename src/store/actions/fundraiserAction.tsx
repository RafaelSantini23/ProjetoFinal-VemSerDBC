import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { DonateCreateDTO } from "../../models/DonateCreateDTO";
import { FundraiserDTO } from "../../models/FundraiserDTO";
import { FundraiserListDTO } from "../../models/FundraiserListDTO";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { loadingMessageCSS } from "react-select/dist/declarations/src/components/Menu";

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

export const donateForCampaign = async (dispatch: AppDispatch, values: DonateCreateDTO, id?: string) => {
    try {
        const { data } = await api.post(`/donation/${id}`, values)

        const donation = {
            type: 'SET_DONATION',
            donation: {
                donate: data,
            }
        }
        console.log(data)

        dispatch(donation);


    } catch (error) {
        console.log(error);
    }
}

export const getCampaign = async (dispatch: AppDispatch, value: string, number: number) => {
    Loading.circle()
    try {
        const { data } = await api.get(`/fundraiser/${value}/${number}`)
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

export const getCampaignDetails = async (dispatch: AppDispatch, id: string | undefined) => {
    try {
        const { data } = await api.get(`/fundraiser/fundraiserDetails/${id}`)
        console.log(data)
        const list: any = [];

        data.categories.map((item: any) => (
            list.push({ value: item.name, label: item.name })
        ))
        const campaign = {
            type: 'SET_CAMPAIGN',
            campaign: data,
            loadingDetails: false,
            categoryList: list
        }
        
        
        dispatch(campaign);
        
        Loading.remove()
    } catch (error) {
        console.log(error)
    }
}

export const updateCampaign = async (values: FundraiserDTO['campaign'], id: number) => {
    const formData = new FormData()
    formData.append('goal', values.goal as string)
    formData.append('endingDate', values.endingDate  as string)
    formData.append('coverPhoto', values.coverPhoto  as string)
    formData.append('description', values.description)
    formData.append('categories', values.categories  as string)
    formData.append('title', values.title)
    formData.append('automaticClose', values.automaticClose  as string)


    try {
        const { data } = await api.post(`/fundraiser/${id}`, formData)

        console.log(data);
        
  
       
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteCampaign = async (id: number, navigate: NavigateFunction) => {
    try {
       const { data } = await api.delete(`/fundraiser/${id}`)
       console.log(data);
       
       navigate('/campanhas')
    } catch (error) {
        console.log(error);
    }
}

export const getCategories = async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.get('/category/findAll')

        const arr: any = []
        data.map((item: any) => (
            arr.push({ value: item.name, label: item.name })
        ))

        const categoryList = {
            type: 'SET_CATEGORYS',
            categorys: arr,
            loading: false
        }


        console.log(data);

        dispatch(categoryList)

    } catch (error) {
        console.log(error);
    }
}