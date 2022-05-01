import { connect, DispatchProp } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Error, ErrorDiv, TotalContribution } from "../../Global.styles";
import { FundraiserListDTO } from "../../models/FundraiserListDTO";
import { ContainerCampanhas, DivCampanha, DivCategoria, ImgCampanha, LinkContainer, TotalSpan,  } from "../../pages/home/Home.styles";
import { AppDispatch, RootState } from "../../store";
import { getCampaign, getCampaignDetails } from "../../store/actions/fundraiserAction";
import { converteBRL, formataCorTotal, formataData, convertImage64, firstUpper, cutCaracteres } from "../../utils/Utils"
import { CategoriesSpan, Category, GoalSpan, LastUpdate, Meta, MetaAtingida, MetaParagraph, NameCreator, TitleCard, TotalRaised } from "./Card.styles";
import DefaultCapa from '../../imgs/dbc.png'
import { useState } from "react";


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
    
    <ContainerCampanhas gap={campaignList.length > 0 ? '50px' : '0px'}>
    { campaignList.length ? campaignList.map((item) => (
          <LinkContainer data-aos="fade-up" key={item.fundraiserId} to={`/details/${item.fundraiserId}`} onClick={() => setLoading()}>
            <DivCampanha>
              <Meta>
                  { item.currentValue >= item.goal && ( <MetaAtingida mT="80px"> Meta Atingida</MetaAtingida> )}
              </Meta>
              <ImgCampanha src={item.coverPhoto ? convertImage64(item.coverPhoto) : DefaultCapa} alt="Imagem campanha" />
              <TitleCard>{firstUpper(item.title)}</TitleCard>
              <DivCategoria>
                <CategoriesSpan>{item.categories.map(category => (
                  <Category  key={category.categoryId}>{firstUpper(category.name)} </Category>
                ))}</CategoriesSpan>
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
        

        ) ) :( <ErrorDiv> <Error>Nenhuma campanha encontrada</Error> </ErrorDiv>)}
        </ContainerCampanhas>
        </>
  )
}

const mapStateToProps = (state: RootState) => ({
  campaignList: state.fundraiserReducer.campaignList,
})

export default connect(mapStateToProps)(Card)