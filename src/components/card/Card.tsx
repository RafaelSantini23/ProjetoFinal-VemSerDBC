import { Loading } from "notiflix";
import { connect, DispatchProp } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { TotalContribution } from "../../Global.styles";
import { FundraiserListDTO } from "../../models/FundraiserListDTO";
import { ContainerCampanhas, DivCampanha, DivCategoria, ImgCampanha, LinkContainer, TotalSpan,  } from "../../pages/home/Home.styles";
import { AppDispatch, RootState } from "../../store";
import { getCampaign, getCampaignDetails } from "../../store/actions/fundraiserAction";
import { converteBRL, formataCorTotal, formataData, convertImage64, firstUpper } from "../../utils/Utils"
import { Meta, MetaAtingida } from "./Card.styles";
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
                  { item.currentValue >= item.goal && ( <MetaAtingida mT="100px"> Meta atingida</MetaAtingida> )}
              </Meta>
              <ImgCampanha src={item.coverPhoto ? convertImage64(item.coverPhoto) : DefaultCapa } alt="foto" />
              <h2>{firstUpper(item.title)}</h2>
              <DivCategoria>
                <span>{item.categories.map(category => (
                  <span key={category.categoryId}>{firstUpper(category.name)} </span>
                ))}</span>
                <small>ID da campanha: {item.fundraiserId}</small>
              </DivCategoria>
              <h4>{item.fundraiserCreator.name}</h4>
              <p>Total Arrecadado: 
                <TotalSpan color={formataCorTotal(item.goal as number, item.currentValue as number)}>
                {converteBRL(item.currentValue)}</TotalSpan>
                </p>
              <p>Meta: <span>{converteBRL(item.goal)}</span></p>
              <small>Última data de alteração: {formataData(item.lastUpdate)}</small>
              {item?.totalContribution && <TotalContribution> Valor contribuido: {converteBRL(item?.totalContribution)} </TotalContribution>}
            </DivCampanha>
          </LinkContainer>
        )): <p>Nenhuma campanha encontrada</p>}
        </ContainerCampanhas>

  )
}

const mapStateToProps = (state: RootState) => ({
  campaignList: state.fundraiserReducer.campaignList,
 })

export default connect(mapStateToProps)(Card)