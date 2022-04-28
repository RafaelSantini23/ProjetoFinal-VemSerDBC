import { 
  ButtonContainer,
  Container,
  ContainerMyCampaign,
  TituloCampanhas,
} from "./Home.styles";
import 'moment/locale/pt-br'
import Card from "../../components/card/Card";
import { ButtonForm } from "../../Global.styles";
import Theme from "../../theme";
import { RootState } from "../../store";
import { connect, DispatchProp } from "react-redux";
import { FundraiserListDTO } from "../../models/FundraiserListDTO";
import { useEffect, useState } from "react";
import { getCampaign } from "../../store/actions/fundraiserAction";
import api from "../../api";
import { Loading } from "notiflix";


function Home({ campaignList, campaignListTemp, dispatch}: FundraiserListDTO & any & DispatchProp)  {

  const [page, setPage] = useState(0)
  const [buttonName, setButtonName] = useState('Minhas Campanhas')
  const [typeName, setTypeName] = useState('findAll')
  const [contribution, setContribution] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = token
    }
    getCampaign(dispatch, 'findAll', page)
  },[])

  // const token = localStorage.getItem('token');

  // const tokenn = token?.split('.')[1];
  // const decoded = JSON.parse(window?.atob(tokenn as string));

  // const id = decoded.sub

  const nextPage = () => {
    setPage(page + 1)
    getCampaign(dispatch, typeName, page + 1)
  }

  const prevPage = () => {
    setPage(page - 1)
    getCampaign(dispatch, typeName, page - 1)
  }
  
  const campaignsList = async (value: string) => {
    setTypeName(value)
    getCampaign(dispatch, value, page)
  }
  
  const filterCampaigns = (value: string) => {
    let campaignFilter: FundraiserListDTO['campaignList'] = []
    if (value === 'completas') {
      campaignFilter = campaignListTemp.filter((item: any) => item.currentValue >= item.goal)
    }else if (value === 'abertas') {
      campaignFilter = campaignListTemp.filter((item: any) => item.currentValue < item.goal)
    } else {
      campaignFilter = campaignListTemp
    }
    Loading.circle()
    const campaign = {
      type: 'SET_CAMPAIGN_LIST',
      campaignList: campaignFilter,
      campaignListTemp: campaignListTemp,
      loading: false
  }
  dispatch(campaign)
  Loading.remove()
  }

  return (
    <>
      <ContainerMyCampaign>
        <ButtonContainer>
        {buttonName === 'Todas as Campanhas' ? <ButtonForm colors={`${Theme.colors.secondary}`} onClick={() => (setButtonName('Minhas Campanhas'), campaignsList('findAll'))}>{buttonName}</ButtonForm>
        : <ButtonForm colors={`${Theme.colors.secondary}`} onClick={() => (setButtonName('Todas as Campanhas'), campaignsList('userFundraisers'))}>{buttonName}</ButtonForm> 
        }
         <ButtonForm colors={`${Theme.colors.secondary}`} onClick={() => (setButtonName('Minhas Campanhas'), campaignsList('userContributions'))}>Minhas contribuições</ButtonForm>
         </ButtonContainer>
      </ContainerMyCampaign>
    <Container>  
      
      <TituloCampanhas>{buttonName === 'Todas as Campanhas' ? 'Minhas Campanhas' : 'Todas as Campanhas'}</TituloCampanhas>
      <select onChange={event => filterCampaigns(event.target.value)}>
        <option value=''>Todos</option>
        <option value='abertas'>Abertas</option>
        <option value='completas'>Concluídas</option>
      </select>
      <Card campaignList={campaignList} />
      
      <div>
        <button disabled={page < 1} onClick={() => prevPage()}> previous </button>
        <button onClick={() => nextPage()}> next </button>
      </div>
    </Container>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
 campaignList: state.fundraiserReducer.campaignList,
 campaignListTemp: state.fundraiserReducer.campaignListTemp,
})

export default connect(mapStateToProps)(Home)