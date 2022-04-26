import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { FundraiserDTO } from "../../models/FundraiserDTO";


export const createCampaign = async (dispatch: AppDispatch, values: FundraiserDTO['campaign'], navigate: NavigateFunction ) => {
  
    const formData = new FormData()

    formData.append('goal', values.goal as any)
    formData.append('endingDate', values.endingDate  as any)
    formData.append('coverPhoto', values.coverPhoto  as any)
    formData.append('description', values.description)
    formData.append('categories', values.categories  as any)
    formData.append('title', values.title)
    formData.append('automaticClose', values.automaticClose  as any)


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