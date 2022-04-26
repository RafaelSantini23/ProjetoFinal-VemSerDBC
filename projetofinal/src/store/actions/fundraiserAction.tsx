import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { FundraiserDTO } from "../../models/FundraiserDTO";


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
      
      console.log(data)

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