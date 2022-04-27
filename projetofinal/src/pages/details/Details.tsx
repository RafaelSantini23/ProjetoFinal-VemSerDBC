import { Loading } from "notiflix";
import { useEffect, useState } from "react";
import { connect, DispatchProp } from "react-redux";
import { useParams } from "react-router-dom";
import { Meta, MetaAtingida } from "../../components/card/Card.styles";
import Modal from "../../components/modal/Modal";
import { ButtonForm } from "../../Global.styles";
import { FundraiserDTO } from "../../models/FundraiserDTO";
import { RootState } from "../../store";
import { getCampaignDetails } from "../../store/actions/fundraiserAction";
import Theme from "../../theme";
import { converteNumber,
  formataData,
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


function Details({campaign, dispatch, loading}: any & DispatchProp) {
  const [isVisibel, setIsVisibel] = useState(false);
  const [modalDonation, setModalDonation] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const {id} = useParams()

  const token = localStorage.getItem('token');

   const tokenn = token?.split('.')[1];
   const decoded = JSON.parse(window?.atob(tokenn as string));

   const idContributor = Number(decoded.sub)
  

  useEffect(() => {
    getCampaignDetails(dispatch, id)
  },[])

  if(loading) {
    return (<>{Loading.circle()}</>)
  }

  return (
    <Container>
      {  isVisibel && (
            <div>
                <Modal height="550px" colabs={campaign.contributors} onClick={() => setIsVisibel(false)} />
            </div> )   }
      <h1>{campaign.title}</h1>
      <ContainerDetails>
        <DivCampanha>
          <DivImagem>
          <Meta>
                { campaign.total >= campaign.meta && ( <MetaAtingida mT='190px'> Meta atingida</MetaAtingida> )}
            </Meta>
            <ImagemCampanha src={convertImage64(campaign.coverPhoto)} alt="capa" />
            <p>Categorias: {campaign.categories.map((category: any) => (
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
            <h3>Arrecadado</h3>
            <TotalTitle color={formataCorTotal(campaign.goal, campaign.currentValue)}>{converteBRL(campaign.currentValue)}</TotalTitle>
            <p>Meta</p>
            <h2>{converteBRL(campaign.goal)}</h2>
            <p>Apoiadores</p>
            <a onClick={() => setIsVisibel(true)}>{campaign.contributors.length}</a>

            <ButtonForm colors={`${Theme.colors.dark}`} onClick={() => setModalDonation(true)}> Doar <IconDonate />  </ButtonForm>

            {  modalDonation && (
            <div>
                <Modal height="150px" typeModal={"donate"}  onClick={() => setModalDonation(false)} />
            </div> ) }
             

            <ButtonForm colors={`${Theme.colors.dark}`} onClick={() => setEditModal(true)}> Editar </ButtonForm>

            {  editModal && (
            <div>
                <Modal height="850px" typeModal='editCampaign'  onClick={() => setEditModal(false)} />
            </div> )}


          </InfoCampanha>
      </ContainerDetails>
    </Container>
  )
}

const mapStateToProps = (state: RootState) => ({
  campaign: state.fundraiserReducer.campaign,
  loading: state.fundraiserReducer.loadingDetails,
 })

export default connect(mapStateToProps)(Details)