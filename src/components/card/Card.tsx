import { Loading } from "notiflix";
import { connect, DispatchProp } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { Error, TotalContribution } from "../../Global.styles";
import { FundraiserListDTO } from "../../models/FundraiserListDTO";
import { ContainerCampanhas, DivCampanha, DivCategoria, ImgCampanha, LinkContainer, TotalSpan,  } from "../../pages/home/Home.styles";
import { AppDispatch, RootState } from "../../store";
import { getCampaign, getCampaignDetails } from "../../store/actions/fundraiserAction";
import { converteBRL, formataCorTotal, formataData, convertImage64, firstUpper } from "../../utils/Utils"
import { CampanhaId, CategoriesSpan, GoalSpan, LastUpdate, Meta, MetaAtingida, MetaParagraph, NameCreator, TitleCard, TotalRaised } from "./Card.styles";
import DefaultCapa from '../../imgs/dbc.png'


function Card({campaignList, dispatch}: FundraiserListDTO & DispatchProp) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

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
    
        <ContainerCampanhas>
         { campaignList.length ? campaignList.map((item) => (
          <LinkContainer key={item.fundraiserId} to={`/details/${item.fundraiserId}`} onClick={() => setLoading()}>
            <DivCampanha>
              <Meta>
                  { item.currentValue >= item.goal && ( <MetaAtingida mT="80px"> Meta Atingida</MetaAtingida> )}
              </Meta>
              <ImgCampanha src={!item.coverPhoto || item.coverPhoto === 'null' ? DefaultCapa : convertImage64(item.coverPhoto) } alt="foto" />
              <TitleCard>{firstUpper(item.title)}</TitleCard>
              <DivCategoria>
                <CategoriesSpan>{item.categories.map(category => (
                  <CategoriesSpan key={category.categoryId}>{firstUpper(category.name)} </CategoriesSpan>
                ))}</CategoriesSpan>
                <CampanhaId>ID da campanha: {item.fundraiserId}</CampanhaId>
              </DivCategoria>
              <NameCreator>{item.fundraiserCreator.name}</NameCreator>
              <TotalRaised>Total Arrecadado: 
                <TotalSpan color={formataCorTotal(item.goal as number, item.currentValue as number)}>
                {converteBRL(item.currentValue)}</TotalSpan>
                </TotalRaised>
              <MetaParagraph>Meta: <GoalSpan>{converteBRL(item.goal)}</GoalSpan> </MetaParagraph>
              <LastUpdate>Alterado {formataData(item.lastUpdate)}</LastUpdate>
              {item?.totalContribution && <TotalContribution> Valor contribuido: {converteBRL(item?.totalContribution)} </TotalContribution>}
            </DivCampanha>
          </LinkContainer>
        )): <Error>Nenhuma campanha encontrada</Error>}
        </ContainerCampanhas>

  )
}

const mapStateToProps = (state: RootState) => ({
  campaignList: state.fundraiserReducer.campaignList,
 })

export default connect(mapStateToProps)(Card)