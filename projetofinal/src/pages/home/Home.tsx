import moment from "moment"
import { formataCorTotal, converteNumber, formataData, somaTotal, converteBRL, formataTags } from "../../utils/Utils";
import { 
  Container,
  TotalSpan,
  ImgCampanha,
  DivCampanha,
  DivCategoria,
  TituloCampanhas,
  ContainerCampanhas
} from "./Home.styles";
import 'moment/locale/pt-br'

function Home() {

  const Campanhas = [{
    id: 1,
    foto: 'https://sm.ign.com/t/ign_br/screenshot/default/supernatural-season-15-cast-poster-1420x798_cnnm.h720.jpg',
    titulo: 'Supernatural',
    meta: converteNumber('1250,00'),
    total: somaTotal(['100,00', '200,00', '500,30', '1000,30']),
    criador: 'O Jão Cee',
    categoria: formataTags(['doação', 'livro', 'além']),
    data: formataData('21 04 2022, 16:21:48')
  },{
    id: 2,
    foto: 'https://sm.ign.com/t/ign_br/screenshot/default/supernatural-season-15-cast-poster-1420x798_cnnm.h720.jpg',
    titulo: 'Supernatural',
    meta: converteNumber('1250,00'),
    total: somaTotal(['800,30']),
    criador: 'O Jão Cee',
    categoria: formataTags(['doação', 'livro', 'além']),
    data: formataData('21 04 2022, 16:21:48')
  },{
    id: 3,
    foto: 'https://sm.ign.com/t/ign_br/screenshot/default/supernatural-season-15-cast-poster-1420x798_cnnm.h720.jpg',
    titulo: 'Supernatural',
    meta: converteNumber('1250,00'),
    total: somaTotal(['100,00', '200,00', '600,00']),
    criador: 'O Jão Cee',
    categoria: formataTags(['doação', 'livro', 'além']),
    data: formataData('21 04 2022, 16:21:48')
  }]
  
  return (
    <Container>
      <TituloCampanhas>Campanhas Recentes</TituloCampanhas>
      <ContainerCampanhas>
        {Campanhas.map((item) => (
          <DivCampanha key={item.id}>
            <ImgCampanha src={item.foto} alt="foto" />
            <h2>{item.titulo}</h2>
            <DivCategoria>
              <span>{item.categoria}</span>
              <small>ID da campanha: {item.id}</small>
            </DivCategoria>
            <h4>{item.criador}</h4>
            <p>Total Arrecadado: 
              <TotalSpan color={formataCorTotal(item.meta, item.total)}>
              {converteBRL(item.total)}</TotalSpan>
              </p>
            <p>Meta: <span>{converteBRL(item.meta)}</span></p>
            <small>Última data de alteração: {item.data}</small>
          </DivCampanha>
        ))}
      </ContainerCampanhas>
    </Container>
  )
}
export default Home