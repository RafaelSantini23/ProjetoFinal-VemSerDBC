import { Loading } from "notiflix";
import { useEffect, useState } from "react";
import { connect, DispatchProp } from "react-redux";
import { Params, useNavigate, useParams } from "react-router-dom";
import { Category, Meta, MetaAtingida, MetaParagraph } from "../../components/card/Card.styles";
import { ButtonContributors, ButtonForm, CampaignInfo, ContainerOwner } from "../../Global.styles";
import { FundraiserDetailsDTO } from "../../models/FundraiserDetailsDTO";
import { UserDTO } from "../../models/UserDTO";
import { RootState } from "../../store";
import { deleteCampaign, getCampaignDetails } from "../../store/actions/fundraiserAction";
import {
  converteBRL,
  convertImage64,
  firstUpper,
  formataCorTotal,
} from "../../utils/Utils";
import {
  Container,
  MsgDesc,
  DivImagem,
  TotalTitle,
  HeaderDesc,
  DivCampanha,
  DescCampanha,
  InfoCampanha,
  ImagemCampanha,
  ContainerDetails,
  IconDonate,
  ButtonOwner,
  TitleCampaign,
  Categories,
  Raised,
  Goal,
  ParagraphContributors,
  SpanCategories,
  ButtonNavigate,
  ContainerButton,
} from "./Details.styles";
import Theme from "../../theme";
import Modal from "../../components/modal/Modal";
import api from "../../api";
import DefaultCapa from '../../images/dbc.png';
import Error from "../../components/error/Error";


function Details({ campaign, dispatch, loadingDetails, errorDetails }: FundraiserDetailsDTO & DispatchProp) {
  
  const navigate = useNavigate()
  const [isVisibel, setIsVisibel] = useState(false);
  const [modalDonation, setModalDonation] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { id }: Readonly<Params<string>> = useParams();
  const token = localStorage.getItem('token');
  const tokenn = token?.split('.')[1];
  const decoded = JSON.parse(window?.atob(tokenn as string));
  const idContributor = Number(decoded.sub)
  const findOwner = campaign?.fundraiserCreator?.userId === idContributor
  const findContributor = campaign.contributors?.find((item: UserDTO) => item.userId === idContributor)


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = token
    }
    
    getCampaignDetails(dispatch, id as string, navigate)
  }, [])

  if (loadingDetails) {
    return <>{Loading.circle()}</>
  }

  if(errorDetails) {
    return <> <Error /> </>
  }
  

  

  return (
    <Container>
      <ContainerButton>
        <ButtonNavigate colors={`${Theme.colors.secondary}`} onClick={() => navigate('/campaigns')} >Voltar para as campanhas</ButtonNavigate>
      </ContainerButton>
      {isVisibel && (

        <Modal width="550px" height="550px" typeModal="cardColabs" colabs={campaign.contributors} onClick={() => setIsVisibel(false)} />
      )
      }
      <TitleCampaign>{firstUpper(campaign.title)}</TitleCampaign>
      <ContainerDetails>
        <DivCampanha>
          <DivImagem>
            <Meta>
              {campaign.currentValue >= campaign.goal && (<MetaAtingida mt='190px'> Meta atingida</MetaAtingida>)}
            </Meta>
            <ImagemCampanha src={campaign.coverPhoto  ? convertImage64(campaign.coverPhoto) : DefaultCapa} alt="capa" />
            <Categories>Categorias: {campaign.categories.map(category => (
              <Category key={category.categoryId} >{firstUpper(category.name)} </Category>
            ))}</Categories>
          </DivImagem>
          <DescCampanha>
            <HeaderDesc>Descrição</HeaderDesc>
            <MsgDesc>
              {campaign.description}
            </MsgDesc>
          </DescCampanha>
        </DivCampanha>
        <InfoCampanha>
          <CampaignInfo>
            <Raised>Arrecadado</Raised>
            <TotalTitle color={formataCorTotal(campaign.goal, campaign.currentValue)}>{converteBRL?.(campaign.currentValue)}</TotalTitle>
            <MetaParagraph>Meta</MetaParagraph>
            <Goal>{converteBRL(campaign.goal)}</Goal>
            <ParagraphContributors>Apoiadores {campaign.contributors.length}</ParagraphContributors>
            <ButtonContributors colors={Theme.colors.dark} onClick={() => setIsVisibel(true)}> Apoiadores </ButtonContributors>
          </CampaignInfo>
          {modalDonation && (
            <Modal width="450px" height="150px" typeModal={"donate"} onClick={() => setModalDonation(false)} />
          )}
          {findOwner ?
            (
              <ContainerOwner>
                <ButtonOwner disabled={campaign.contributors.length > 0} colors={`${Theme.colors.warning}`} onClick={() => setEditModal(true)}> Editar </ButtonOwner>
                <ButtonOwner colors={`${Theme.colors.danger}`} onClick={() => deleteCampaign(campaign.fundraiserId, navigate)}> Deletar </ButtonOwner>
              </ContainerOwner>) : <ButtonForm disabled={campaign.automaticClose && campaign.currentValue >= campaign.goal} colors={`${Theme.colors.dark}`} onClick={() => setModalDonation(true)}> {findContributor ? 'Doar novamente' : 'Doar'} <IconDonate />  </ButtonForm>}
          {editModal && (
            <Modal width="1050px" height="580px" typeModal='editCampaign' onClick={() => setEditModal(false)} />
          )}
        </InfoCampanha>
      </ContainerDetails>
    </Container>

  )
}

const mapStateToProps = (state: RootState) => ({
  campaign: state.fundraiserReducer.campaign,
  loadingDetails: state.fundraiserReducer.loadingDetails,
  loadingDonate: state.fundraiserReducer.loadingDonate,
  errorDetails: state.fundraiserReducer.errorDetails,
})

export default connect(mapStateToProps)(Details)