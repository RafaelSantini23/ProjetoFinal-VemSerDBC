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
import { getCampaign, getCampaingOfUser } from "../../store/actions/fundraiserAction";
import api from "../../api";


function Home({ campaignList, dispatch}: FundraiserListDTO & DispatchProp)  {
  const [myCampaignsList, setMyCampaignsList] = useState(false)

  const [page, setPage] = useState(0)
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = token
    }
    myCampaignsList ? getCampaingOfUser(dispatch, page) : getCampaign(dispatch, page)
    // getCampaign(dispatch, page)
  },[])

  // const token = localStorage.getItem('token');

  // const tokenn = token?.split('.')[1];
  // const decoded = JSON.parse(window?.atob(tokenn as string));

  // const id = decoded.sub

  const nextPage = () => {
    setPage(page + 1)
    if(myCampaignsList) {
      getCampaingOfUser(dispatch, page + 1)
    } 
      
    if(!myCampaignsList) {
      getCampaign(dispatch, page + 1)
      setMyCampaignsList(false)
    }
    
  }

  const prevPage = () => {
    setPage(page - 1)
    if(myCampaignsList) {
      getCampaingOfUser(dispatch, page - 1)
    } 

    if(!myCampaignsList) {
      getCampaign(dispatch, page - 1)
    }

  }
  
  const campaignsList = (getCampaignOf: Function, condition: boolean) => {
    getCampaignOf(dispatch, page)
    setMyCampaignsList(condition)
  }

  

  return (
    <>
      <ContainerMyCampaign>
        <ButtonContainer>
         { myCampaignsList ? <ButtonForm colors={`${Theme.colors.secondary}`} onClick={() => campaignsList(getCampaign, false)}> Todas as Campanhas </ButtonForm> :
         <ButtonForm colors={`${Theme.colors.secondary}`} onClick={() => campaignsList(getCampaingOfUser, true)}> Minhas Campanhas </ButtonForm> 
          } 
        </ButtonContainer>
      </ContainerMyCampaign>
    <Container>  
      
      <TituloCampanhas>{myCampaignsList ? 'Minhas Campanhas' : 'Todas as campanhas'}</TituloCampanhas>
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
})

export default connect(mapStateToProps)(Home)