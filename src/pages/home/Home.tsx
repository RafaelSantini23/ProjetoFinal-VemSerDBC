import { 
  Container,
  DivSelects,
  ButtonHome,
  DefaultSelect,
  DivHeaderTitle,
  ButtonContainer,
  TituloCampanhas,
  ContainerMyCampaign,
} from "./Home.styles";
import { RootState } from "../../store";
import { connect, DispatchProp } from "react-redux";
import { Loading } from "notiflix";
import { useEffect, useState } from "react";
import { FundraiserListDTO } from "../../models/FundraiserListDTO";
import { getCampaign, getCategories } from "../../store/actions/fundraiserAction";
import { CategoryDTO } from "../../models/CategoryDTO";
import { CategoryOptionDTO } from "../../models/CategoryOptionDTO";
import api from "../../api";
import Card from "../../components/card/Card";
import 'moment/locale/pt-br'


type campaign = {
  goal: number;
  currentValue: number;
}

type Home = {
  campaignListFilter: FundraiserListDTO[];
  categorys: CategoryDTO[];
}


function Home({ campaignList, campaignListFilter, categorys, dispatch, loading}: FundraiserListDTO & any & CategoryOptionDTO & DispatchProp)  {
  const [page, setPage] = useState(0)
  const [buttonName, setButtonName] = useState('Minhas Campanhas')
  const [routeName, setRouteName] = useState('findAllFundraisersActive')
  const [value, setValue] = useState(null)
  const [status, setStatus] = useState(null)
  const [valueArray, setValueArray] = useState<string[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = token
    }
    getCampaign(dispatch, 'findAllFundraisersActive', page)
    getCategories(dispatch)
    console.log(categorys)
  },[])

  if (loading) {
    return <>{Loading.circle()}</>
  }

  const pagination = (direction: string) => {
    Loading.circle()
    switch(direction) {
      case 'next':
        setPage(page + 1)
        getCampaign(dispatch, routeName, page + 1, valueArray)
        break;
      case 'prev':
        setPage(page - 1)
        getCampaign(dispatch, routeName, page - 1, valueArray)
        break;
    }
  }
    
  const campaignsList = async (value: string, array?: string | string[]) => {
    setRouteName(value)
    getCampaign(dispatch, value, page, array as string[])
  }
  
  const filterAllCampaigns = (value: string | string[]) => {

    if (routeName === 'userContributions' || routeName === 'userFundraisers') {
      let listFilter = [];
      switch(value) {
        case 'atingidas':
          listFilter = campaignListFilter.filter((campaign: any) => campaign.currentValue >= campaign.goal)
          break;
        case 'nao-atingidas':
          listFilter = campaignListFilter.filter((campaign: any) => campaign.currentValue < campaign.goal)
          break;
        default:
          listFilter = campaignListFilter
        }
      Loading.circle()
      const filter = {
        type: 'SET_CAMPAIGN_LIST',
        campaignList: listFilter,
        campaignListFilter: campaignListFilter
      }

      dispatch(filter)
      Loading.remove()

    } else {
      switch(true) {
        case value === 'atingidas':
          campaignsList('findAcchieved') 
          setValue(null)
          break;
        case value === 'nao-atingidas':
          campaignsList('findNotAcchieved')
          setValue(null)
          break;
        case value as string[] && value.length > 0:
          campaignsList('byCategories', value)
          setValueArray(value as string[])
          setStatus(null)
          break;
        default:
          campaignsList('findAllFundraisersActive')
          setValue(null)
          setStatus(null)
        break;
      }
    }
  }

 
  const optionsFilter = [
    { value: '', label: 'Todos'},
    { value: 'atingidas', label: 'Atingidas'},
    { value: 'nao-atingidas', label: 'Não Atingidas'},
  ]

  return (
    <>
    <ContainerMyCampaign>
      <ButtonContainer>
      {
        buttonName === 'Todas as Campanhas'
        ? <ButtonHome  onClick={() => (setButtonName('Minhas Campanhas'), campaignsList('findAllFundraisersActive'))}>{buttonName}</ButtonHome>
        : <ButtonHome  onClick={() => (setButtonName('Todas as Campanhas'), campaignsList('userFundraisers'))}>{buttonName}</ButtonHome> 
      } 
      <ButtonHome  onClick={() => (setButtonName('Todas as Campanhas'), campaignsList('userContributions'))}>Minhas contribuições</ButtonHome>
      </ButtonContainer>
      <DivSelects>
        <DefaultSelect  placeholder='Status' options={optionsFilter} value={status} onChange={(event: any) => (filterAllCampaigns(event.value), setStatus(event))} />
        {routeName !== 'userContributions' && routeName !== 'userFundraisers' ? <DefaultSelect  placeholder='Categoria(s)' options={categorys} value={value} onChange={(event: any) => (filterAllCampaigns(event.map((item: any) => item.value)), setValue(event))} isMulti isClearable /> : null}
      </DivSelects>
    </ContainerMyCampaign>
    <DivHeaderTitle>
    <TituloCampanhas>{routeName === 'userFundraisers' ? 'Minhas Campanhas' : routeName === 'userContributions' ? 'Minhas Contribuições' : 'Todas as Campanhas'}</TituloCampanhas>
    </DivHeaderTitle>
    <Container>  
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
 campaignListFilter: state.fundraiserReducer.campaignListFilter,
 campaignList: state.fundraiserReducer.campaignList,
 categorys: state.fundraiserReducer.categorys,
 loading: state.fundraiserReducer.loading,
 totalPages: state.fundraiserReducer.totalPages
})

export default connect(mapStateToProps)(Home)