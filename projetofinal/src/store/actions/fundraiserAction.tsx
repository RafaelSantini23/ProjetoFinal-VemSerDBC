import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { FundraiserDTO } from "../../models/FundraiserDTO";


export const createCampaign = async (dispatch: AppDispatch, values: any, navigate: NavigateFunction ) => {
  
    const formData = new FormData()

    formData.append('title', values.title)
    formData.append('goal', values.goal)
    formData.append('validdate', values.validdate)
    formData.append('automaticClose', values.automaticClose)
    formData.append('coverPhoto', values.coverPhoto)
    formData.append('categories', values.categories)
    formData.append('description', values.description)

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