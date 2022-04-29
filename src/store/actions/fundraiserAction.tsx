import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { DonateCreateDTO } from "../../models/DonateCreateDTO";
import { FundraiserDTO } from "../../models/FundraiserDTO";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Notify } from "notiflix";



export const createCampaign = async (values: FundraiserDTO['campaign'], navigate: NavigateFunction ) => {
  
    const formData = new FormData()
    
    formData.append('goal', values.goal as string)
    formData.append('endingDate', values.endingDate  as string)
    formData.append('coverPhoto', values.coverPhoto  as string)
    formData.append('description', values.description)
    formData.append('categories', values.categories  as string)
    formData.append('title', values.title)
    formData.append('automaticClose', values.automaticClose  as string)

  try {
      await api.post('/fundraiser/save', formData);
  
      navigate('/campanhas')
      Notify.success('Campanha criada com sucesso!');
  } catch (error) {
      console.log(error); 
      Notify.failure('Erro ao excluir campanha!');
    }
}

export const donateForCampaign = async (values: DonateCreateDTO['donate'], dispatch: AppDispatch , id?: string) => {
    Loading.circle()
    try {
        await api.post(`/donation/${id}`, values)
        Notify.success('Doação feita com sucesso!');
        
    } catch (error) {
        console.log(error);
        Notify.failure('Erro ao fazer a doação!');
    }
    getCampaignDetails(dispatch, id as string)
    Loading.remove()
}

export const getCampaign = async (dispatch: AppDispatch, value: string, number: number) => {
    Loading.circle()
    try {
      const { data } = await api.get(`/fundraiser/${value}/${number}`)
      const {content} = data

      const campaignList = {
          type: 'SET_CAMPAIGN_LIST',
          campaignList: content,
          campaignListTemp: content,
          loading: false
      }
      console.log(data);
  
      dispatch(campaignList)
      Loading.remove()
    } catch (error) {
      console.log(error)
    }
}

export const getCampaignDetails = async (dispatch: AppDispatch, id: string | number) => {
    try {
        const { data } = await api.get(`/fundraiser/fundraiserDetails/${id}`)
        const list: any = []
        data.categories.map((item: any) => (
            list.push({ value: item.name, label: item.name })
        ))

        const campaign = {
            type: 'SET_CAMPAIGN',
            campaign: data,
            loading: false,
            loadingDetails:false,
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
    formData.append('endingDate', values.endingDate)
    formData.append('coverPhoto', values.coverPhoto  as string)
    formData.append('description', values.description)
    formData.append('categories', values.categories)
    formData.append('title', values.title)
    formData.append('automaticClose', values.automaticClose  as string)


    try {
        await api.post(`/fundraiser/${id}`, formData)

    } catch (error) {
        console.log(error);
        
    }
}

export const deleteCampaign = (id: number, navigate: NavigateFunction) => {
    try {
        confirmAlert({
            title: 'Confirme para deletar',
            message: 'Você tem certeza ao fazer isso.',
            buttons: [
              {
                label: 'Sim',
                onClick: async () => ( await api.delete(`/fundraiser/${id}`),navigate('/campanhas'), Notify.success('Campanha excluida com sucesso!'))
              },
              {
                label: 'Não',
                onClick: () => navigate(`/details/${id}`)
              }
            ]
          });
       
    } catch (error) {
        Notify.failure('Erro ao excluir a campanha!')
        console.log(error);
    }
}

type Category = {
    name: string
}

export const getCategories = async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.get('/category/findAll')

        const arr: any = []
        data.map((item: Category) => (
            arr.push({ value: item.name, label: item.name })
        ))

        const categoryList = {
            type: 'SET_CATEGORYS',
            categorys: arr,
            loading: false
        }
        
        dispatch(categoryList)

    } catch (error) {
        console.log(error);
    }
}