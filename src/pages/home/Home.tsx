import { 
  ButtonContainer,
  ButtonHome,
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
import { Loading } from "notiflix";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FundraiserListDTO } from "../../models/FundraiserListDTO";
import { getCampaign, getCategories } from "../../store/actions/fundraiserAction";
import Select, { MultiValue } from 'react-select'
import api from "../../api";
import { CategoryDTO } from "../../models/CategoryDTO";


type campaign = {
  goal: number;
  currentValue: number;
}

type Home = {
  campaignListTemp: FundraiserListDTO[];
  categorys: CategoryDTO[];
}


function Home({ campaignList, campaignListTemp, categorys, dispatch, loading}: FundraiserListDTO & any & DispatchProp)  {
  const [page, setPage] = useState(0)
  const [buttonName, setButtonName] = useState('Minhas Campanhas')
  const [typeName, setTypeName] = useState('findAll')
  const [value, setValue] = useState(null)
  const [status, setStatus] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = token
    }
    getCampaign(dispatch, 'findAll', page)
    getCategories(dispatch)
  },[])

  if (loading) {
    return <>{Loading.circle()}</>
  }

  // const token = localStorage.getItem('token');

  // const tokenn = token?.split('.')[1];
  // const decoded = JSON.parse(window?.atob(tokenn as string));

  // const id = decoded.sub

  console.log(campaignList.length);
  

  


  const pagination = (direction: string) => {
    Loading.circle()
    switch(direction) {
      case 'next':
        setPage(page + 1)
        getCampaign(dispatch, typeName, page + 1)
        break;
      case 'prev':
        setPage(page - 1)
        getCampaign(dispatch, typeName, page - 1)
        break;
    }
    setValue(null)
    setStatus(null)
  }
    
  const campaignsList = async (value: string) => {
    setTypeName(value)
    getCampaign(dispatch, value, page)
  }
  
  const filterCampaigns = (value: string | string[]) => {
    let campaignFilter: FundraiserListDTO['campaignList'] = []
    if (value === 'completas') {
      campaignFilter = campaignListTemp.filter((item: campaign) => item.currentValue >= item.goal) 
      setValue(null)
    }else if (value === 'abertas') {
      campaignFilter = campaignListTemp.filter((item: campaign) => item.currentValue < item.goal)
      setValue(null)
    } else if (value as string[] && value.length > 0) {
      campaignFilter = campaignList.filter((item: CategoryDTO) => item.categories.find(category => value.includes(category.name)))
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

  const optionsFilter = [
    { value: '', label: 'Todos'},
    { value: 'abertas', label: 'Abertas'},
    { value: 'completas', label: 'Concluídas'},
  ]

  return (
    <>
      <ContainerMyCampaign>
        <ButtonContainer>
        {buttonName === 'Todas as Campanhas' ? <ButtonHome  onClick={() => (setButtonName('Minhas Campanhas'), campaignsList('findAll'))}>{buttonName}</ButtonHome>
        : <ButtonHome  onClick={() => (setButtonName('Todas as Campanhas'), campaignsList('userFundraisers'))}>{buttonName}</ButtonHome> 
      }
         <ButtonHome  onClick={() => (setButtonName('Minhas Campanhas'), campaignsList('userContributions'))}>Minhas contribuições</ButtonHome>

         </ButtonContainer>
      </ContainerMyCampaign>
    <Container>  
      <Select placeholder='Selecione a(s) categoria(s)' options={categorys} value={value} onChange={(event: any) => (filterCampaigns(event.map((item: any) => item.value)), setValue(event))} isMulti isClearable />
      <TituloCampanhas>{buttonName === 'Todas as Campanhas' ? 'Minhas Campanhas' : 'Todas as Campanhas'}</TituloCampanhas>
      <Select placeholder='Selecione o status' options={optionsFilter} value={status} onChange={(event: any) => (filterCampaigns(event.value), setStatus(event))} />
      <Card/>
      
      <div>
        <button disabled={page < 1} onClick={() => pagination('prev')}> Anterior </button>
        <button disabled={campaignList.length <= 0} onClick={() => pagination('next')}> Próxima </button>
      </div>
    </Container>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
 campaignListTemp: state.fundraiserReducer.campaignListTemp,
 campaignList: state.fundraiserReducer.campaignList,
 categorys: state.fundraiserReducer.categorys,
 loading: state.fundraiserReducer.loading,
 
})

export default connect(mapStateToProps)(Home)