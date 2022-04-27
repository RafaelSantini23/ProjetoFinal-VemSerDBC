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


function Home({ campaignList, dispatch}: FundraiserListDTO & DispatchProp)  {

  const [page, setPage] = useState(0)
  const [buttonName, setButtonName] = useState('Minhas Campanhas')
  const [typeName, setTypeName] = useState('findAll')

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
    console.log(typeName)
  }

  const prevPage = () => {
    setPage(page - 1)
    getCampaign(dispatch, typeName, page - 1)
    console.log(typeName)
  }
  
  const campaignsList = async (value: string) => {
    setTypeName(value)
    console.log(typeName)
    getCampaign(dispatch, value, page)
    console.log(typeName)
  }
  
  return (
    <>
      <ContainerMyCampaign>
        <ButtonContainer>
        {buttonName === 'Todas as Campanhas' ? <ButtonForm colors={`${Theme.colors.secondary}`} onClick={() => (setButtonName('Minhas Campanhas'), campaignsList('findAll'))}>{buttonName}</ButtonForm>
        : <ButtonForm colors={`${Theme.colors.secondary}`} onClick={() => (setButtonName('Todas as Campanhas'), campaignsList('userFundraisers'))}>{buttonName}</ButtonForm> 
        }
         </ButtonContainer>
      </ContainerMyCampaign>
    <Container>  
      
      <TituloCampanhas>{buttonName === 'Todas as Campanhas' ? 'Minhas Campanhas' : 'Todas as Campanhas'}</TituloCampanhas>
      <select>
        <option value='completed'></option>
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
})

export default connect(mapStateToProps)(Home)