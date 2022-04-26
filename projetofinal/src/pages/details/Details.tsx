import { useState } from "react";
import Modal from "../../components/modal/Modal";
import { ButtonForm } from "../../Global.styles";
import { RootState } from "../../store";
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


  const Campanhas = {
    id: 1,
    foto: 'https://sm.ign.com/t/ign_br/screenshot/default/supernatural-season-15-cast-poster-1420x798_cnnm.h720.jpg',
    titulo: 'Supernatural',
    meta: converteNumber('1250,00'),
    total: somaTotal(['100,00', '200,00', '500,30']),
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

            <ButtonForm onClick={() => setModalDonation(true)}> Contribuir <IconDonate />  </ButtonForm>

            {  modalDonation && (
            <div>
                <Modal height="150px" donate={true}  onClick={() => setModalDonation(false)} />
            </div> )}
          </InfoCampanha>
      </ContainerDetails>
    </Container>
  )
}

export default Details