import { Loading } from "notiflix";
import { useEffect, useState } from "react";
import { connect, DispatchProp } from "react-redux";
import { Params, useNavigate, useParams } from "react-router-dom";
import { Meta, MetaAtingida } from "../../components/card/Card.styles";
import { ButtonForm, ButtonOwner, CampaignInfo, ContainerOwner } from "../../Global.styles";
import { FundraiserDetailsDTO } from "../../models/FundraiserDetailsDTO";
import { UserDTO } from "../../models/UserDTO";
import { RootState } from "../../store";
import { deleteCampaign, getCampaignDetails } from "../../store/actions/fundraiserAction";
import { 
  converteBRL,
  convertImage64,
  formataCorTotal,
} from "../../utils/Utils"
import { Container,
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
} from "./Details.styles"
import Theme from "../../theme";
import Modal from "../../components/modal/Modal";
import api from "../../api";


function Details({campaign, dispatch, loadingDetails, loadingDonate}: FundraiserDetailsDTO & DispatchProp) {
  const navigate = useNavigate()
  const [isVisibel, setIsVisibel] = useState(false);
  const [modalDonation, setModalDonation] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const {id}: Readonly<Params<string>> = useParams()

  const token = localStorage.getItem('token');

  const tokenn = token?.split('.')[1];
  const decoded = JSON.parse(window?.atob(tokenn as string));
  const idContributor = Number(decoded.sub)

  const findOwner = campaign?.fundraiserCreator?.userId === idContributor

  const findContributor = campaign.contributors?.find((item: UserDTO) => item.userId === idContributor)

  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      api.defaults.headers.common['Authorization'] = token
    }
    getCampaignDetails(dispatch, id as string)
  },[])
  
  if(loadingDetails) {
    return <>{Loading.circle()}</>
  }
 

  return (
    <Container>
      
       {  isVisibel && (
            <div>
                <Modal height="550px" typeModal="cardColabs" colabs={campaign.contributors} onClick={() => setIsVisibel(false)} />
            </div> )   
            }
      <h1>{campaign.title}</h1>
      <ContainerDetails>
        <DivCampanha>
          <DivImagem>
          <Meta>
                { campaign.currentValue >= campaign.goal && ( <MetaAtingida mT='190px'> Meta atingida</MetaAtingida> )}
            </Meta>
            <ImagemCampanha src={convertImage64(campaign.coverPhoto)} alt="capa" />
            <p>Categorias: {campaign.categories.map(category => (
              <span>{category.name}</span>
            ))}</p> 
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

            <h3>Arrecadado</h3>
            <TotalTitle color={formataCorTotal(campaign.goal, campaign.currentValue)}>{converteBRL?.(campaign.currentValue)}</TotalTitle>
            <p>Meta</p>
            <h2>{converteBRL(campaign.goal)}</h2>
            <p>Apoiadores</p>
            <a onClick={() => setIsVisibel(true)}>{campaign.contributors.length}</a>
            </CampaignInfo>

            

            {  modalDonation && (
            <div>
                <Modal  height="150px" typeModal={"donate"}  onClick={() => setModalDonation(false)} />
            </div> ) }

             { findOwner ? 
               (
               <ContainerOwner>

              <ButtonOwner disabled={campaign.contributors.length > 0} colors={`${Theme.colors.warning}`} onClick={() => setEditModal(true)}> Editar </ButtonOwner> 
              <ButtonOwner colors={`${Theme.colors.danger}`} onClick={() => deleteCampaign(campaign.fundraiserId, navigate)}> Deletar </ButtonOwner>  
              
              
              </ContainerOwner>) : <ButtonForm colors={`${Theme.colors.dark}`} onClick={() => setModalDonation(true)}> { findContributor ? 'Doar novamente' : 'Doar' } <IconDonate />  </ButtonForm>}
              


            {  editModal && (
            <div>
                <Modal width="1050px"  height="690px" typeModal='editCampaign'  onClick={() => setEditModal(false)} />
            </div> )}


          </InfoCampanha>
      </ContainerDetails> 
    </Container> 
     
  )
}

const mapStateToProps = (state: RootState) => ({
  campaign: state.fundraiserReducer.campaign,
  loadingDetails: state.fundraiserReducer.loadingDetails,
  loadingDonate: state.fundraiserReducer.loadingDonate,
 })

export default connect(mapStateToProps)(Details)