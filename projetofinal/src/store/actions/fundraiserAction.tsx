import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import api from "../../api";
import { FundraiserDTO } from "../../models/FundraiserDTO";


export const createCampaign = async (dispatch: AppDispatch, values: FundraiserDTO['campaign'], navigate: NavigateFunction ) => {
  console.log('Entrei na função');
  
  try {
      console.log('Entrei no try');

      console.log(values);
      const { data } = await api.post('/fundraiser', values);
      
      
      const campaign = {
          type: 'SET_CAMPAIGN',
          campaign: data
      }

      dispatch(campaign);

      console.log(campaign);
      

      navigate('/campanhas')
  } catch (error) {
      console.log(error);
      
  }
}