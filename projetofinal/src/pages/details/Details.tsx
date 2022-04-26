import { useState } from "react";
import { Meta, MetaAtingida } from "../../components/card/Card.styles";
import Modal from "../../components/modal/Modal";
import { ButtonForm } from "../../Global.styles";
import Theme from "../../theme";
import { converteNumber,
  somaTotal,
  formataTags,
  formataData,
  converteBRL,
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


function Details() {
  const [isVisibel, setIsVisibel] = useState(false);
  const [ modalDonation, setModalDonation ] = useState(false);
  const [ editModal, setEditModal] = useState(false);


  const Campanhas = {
    id: 1,
    foto: 'https://sm.ign.com/t/ign_br/screenshot/default/supernatural-season-15-cast-poster-1420x798_cnnm.h720.jpg',
    titulo: 'Supernatural',
    meta: converteNumber('1250,00'),
    total: somaTotal(['100,00', '900,00', '500,30']),
    criador: 'O Jão Cee',
    categoria: formataTags(['doação', 'livro', 'além']),
    data: formataData('21 04 2022, 16:21:48'),
    descricao: "Ajude o supernatural...",
    apoiadores: [{
      id: "1",
            name: "João",
            photo: "https://sm.ign.com/t/ign_br/screenshot/default/supernatural-season-15-cast-poster-1420x798_cnnm.h720.jpg"
    }, {
      id: "2",
            name: "Jão",
            photo: "https://sm.ign.com/t/ign_br/screenshot/default/supernatural-season-15-cast-poster-1420x798_cnnm.h720.jpg"
    }, {
      id: "3",
            name: "Jão",
            photo: "https://sm.ign.com/t/ign_br/screenshot/default/supernatural-season-15-cast-poster-1420x798_cnnm.h720.jpg"
    }]
  }

  return (
    <Container>
      {  isVisibel && (
            <div>
                <Modal height="550px" colabs={Campanhas.apoiadores} onClick={() => setIsVisibel(false)} />
            </div> )   }
      <h1>{Campanhas.titulo}</h1>
      <ContainerDetails>
        <DivCampanha>
          <DivImagem>
            <Meta>
                { Campanhas.total >= Campanhas.meta && ( <MetaAtingida mT='190px'> Meta atingida</MetaAtingida> )}
            </Meta>
            <ImagemCampanha src={Campanhas.foto} alt="capa" />
            <p>Categorias: {Campanhas.categoria}</p> 
          </DivImagem>
          <DescCampanha>
            <HeaderDesc>Descrição</HeaderDesc>
            <MsgDesc>
              {Campanhas.descricao}
            </MsgDesc>
          </DescCampanha>
        </DivCampanha>
          <InfoCampanha>
            <h3>Arrecadado</h3>
            <TotalTitle color={formataCorTotal(Campanhas.meta, Campanhas.total)}>{converteBRL(Campanhas.total)}</TotalTitle>
            <p>Meta</p>
            <h2>{converteBRL(Campanhas.meta)}</h2>
            <p>Apoiadores</p>
            <a onClick={() => setIsVisibel(true)}>{Campanhas.apoiadores.length}</a>

            <ButtonForm colors={`${Theme.colors.dark}`} onClick={() => setModalDonation(true)}> Contribuir <IconDonate />  </ButtonForm>

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
export default Details