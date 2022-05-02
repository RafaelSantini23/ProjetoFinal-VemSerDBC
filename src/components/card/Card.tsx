import { connect, DispatchProp } from "react-redux";
import { Error, ErrorDiv, TotalContribution } from "../../Global.styles";
import { FundraiserListDTO } from "../../models/FundraiserListDTO";
import { converteBRL, formataCorTotal, formataData, convertImage64, firstUpper } from "../../utils/Utils"
import { RootState } from "../../store";
import DefaultCapa from '../../images/dbc.png'
import {
  TotalSpan,  
  DivCampanha, 
  ImgCampanha, 
  DivCategoria, 
  LinkContainer, 
  ContainerCampanhas,
} from "../../pages/home/Home.styles";
import {
  Meta, 
  Category, 
  GoalSpan, 
  TitleCard, 
  LastUpdate, 
  NameCreator, 
  TotalRaised,
  MetaAtingida, 
  MetaParagraph, 
  CategoriesSpan, 
} from "./Card.styles";


function Card({campaignList, dispatch}: FundraiserListDTO & DispatchProp) {
  const token = localStorage.getItem('token');  

  const tokenn = token?.split('.')[1];
  const decoded = JSON.parse(window?.atob(tokenn as string));

  const id = decoded.sub
  
  const setLoading = () => {
    const loading = {
      type: 'SET_LOADING',
      loadingDetails: true,
      loadingDonate: true
  }
  dispatch(loading)
  }

  return (
    <>
    
    <ContainerCampanhas gap={campaignList.length > 1 ? '50px' : '0px'}>
    { campaignList.length ? campaignList.map((item) => (
          <LinkContainer key={item.fundraiserId} to={`/details/${item.fundraiserId}`} onClick={() => setLoading()}>
            <DivCampanha>
              <Meta>
                  { item.currentValue >= item.goal && ( <MetaAtingida mt="80px"> Meta Atingida</MetaAtingida> )}
              </Meta>
              <ImgCampanha src={item.coverPhoto ? convertImage64(item.coverPhoto) : DefaultCapa} alt="Imagem campanha" />
              <TitleCard>{firstUpper(item.title)}</TitleCard>
              <DivCategoria>
                <CategoriesSpan>{item.categories.map(category => (
                  <Category  key={category.categoryId}>{firstUpper(category.name)} </Category>
                ))}</CategoriesSpan>
              </DivCategoria>
              <NameCreator>{firstUpper(item.fundraiserCreator.name as string)}</NameCreator>
              <TotalRaised>Total Arrecadado: 
                <TotalSpan color={formataCorTotal(item.goal as number, item.currentValue as number)}>
                {converteBRL(item.currentValue)}</TotalSpan>
                </TotalRaised>
              <MetaParagraph>Meta: <GoalSpan>{converteBRL(item.goal)}</GoalSpan> </MetaParagraph>
              <LastUpdate>Alterado {formataData(item.lastUpdate)}</LastUpdate>
              {item?.totalContribution && <TotalContribution> Valor contribuido: {converteBRL(item?.totalContribution)} </TotalContribution>}
            </DivCampanha>
          </LinkContainer>
        

        ) ) :( <ErrorDiv> <Error>Nenhuma campanha encontrada</Error> </ErrorDiv>)}
        </ContainerCampanhas>
        </>
  )
}

const mapStateToProps = (state: RootState) => ({
  campaignList: state.fundraiserReducer.campaignList,
})

export default connect(mapStateToProps)(Card)