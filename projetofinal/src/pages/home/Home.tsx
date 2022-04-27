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
import { selectGet } from "../../store/actions/fundraiserAction";
import api from "../../api";


function Home({ campaignList, dispatch}: FundraiserListDTO & DispatchProp)  {

  const [page, setPage] = useState(0)
  const [buttonName, setButtonName] = useState('Minhas Campanhas')
  const [typeName, setTypeName] = useState('total')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = token
    }
    selectGet('total', dispatch, page)
  },[])

  // const token = localStorage.getItem('token');

  // const tokenn = token?.split('.')[1];
  // const decoded = JSON.parse(window?.atob(tokenn as string));

  // const id = decoded.sub

  const nextPage = () => {
    setPage(page + 1)
    selectGet(typeName, dispatch, page + 1)
    console.log(typeName)
  }

  const prevPage = () => {
    setPage(page - 1)
    selectGet(typeName, dispatch, page - 1)
    console.log(typeName)
  }
  
  const campaignsList = async (value: string) => {
    setTypeName(value)
    console.log(typeName)
    selectGet(value, dispatch, page)
    console.log(typeName)
  }
console.log(typeName)
  
  return (
    <>
      <ContainerMyCampaign>
        <ButtonContainer>
        {buttonName === 'Todas as Campanhas' ? <ButtonForm colors={`${Theme.colors.secondary}`} onClick={() => (setButtonName('Minhas Campanhas'), campaignsList('total'))}>{buttonName}</ButtonForm>
        : <ButtonForm colors={`${Theme.colors.secondary}`} onClick={() => (setButtonName('Todas as Campanhas'), campaignsList('user'))}>{buttonName}</ButtonForm> 
        }
         </ButtonContainer>
      </ContainerMyCampaign>
    <Container>  
      
      <TituloCampanhas>{buttonName === 'Todas as Campanhas' ? 'Minhas Campanhas' : 'Todas as Campanhas'}</TituloCampanhas>
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