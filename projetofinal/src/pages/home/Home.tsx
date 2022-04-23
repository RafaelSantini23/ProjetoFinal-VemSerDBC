import moment from "moment"
import { formataCorTotal, converteNumber, formataData, somaTotal, converteBRL, formataTags } from "../../utils/Utils";
import { 
  Container,
  TotalSpan,
  ImgCampanha,
  DivCampanha,
  DivCategoria,
  LinkContainer,
  TituloCampanhas,
  ContainerCampanhas
} from "./Home.styles";
import 'moment/locale/pt-br'
import { connect } from "react-redux";
import { RootState } from "../../store";
import { DispatchProp } from "react-redux";
import { AuthDTO } from "../../models/AuthDTO";
import { buffer } from "stream/consumers";


function Home({auth, dispatch}: any )  {

  console.log(auth);
  const token = localStorage.getItem('token');

  const tokenn = token?.split('.')[1];
  const decoded = JSON.parse(window?.atob(tokenn as string));
  const data = moment(decoded.exp * 1000).format('DD/MM/YYYY');
  
  console.log(decoded.sub);

  
  
  

  

  const Campanhas = [
    {
    id: 1,
    foto: 'https://sm.ign.com/t/ign_br/screenshot/default/supernatural-season-15-cast-poster-1420x798_cnnm.h720.jpg',
    titulo: 'Supernatural',
    meta: converteNumber('1250,00'),
    total: somaTotal(['100,00', '200,00', '500,30', '1000,30']),
    criador: 'O Jão Cee',
    categoria: formataTags(['doação', 'livro', 'além']),
    data: formataData('21 04 2022, 16:21:48')
  },

  {
    id: 2,
    foto: 'https://sm.ign.com/t/ign_br/screenshot/default/supernatural-season-15-cast-poster-1420x798_cnnm.h720.jpg',
    titulo: 'Supernatural',
    meta: converteNumber('1250,00'),
    total: somaTotal(['800,30']),
    criador: 'O Jão Cee',
    categoria: formataTags(['doação', 'livro', 'além']),
    data: formataData('21 04 2022, 16:21:48')
  },

  {
    id: 3,
    foto: 'https://sm.ign.com/t/ign_br/screenshot/default/supernatural-season-15-cast-poster-1420x798_cnnm.h720.jpg',
    titulo: 'Supernatural',
    meta: converteNumber('1250,00'),
    total: somaTotal(['100,00', '200,00', '600,00']),
    criador: 'O Jão Cee',
    categoria: formataTags(['doação', 'livro', 'além']),
    data: formataData('21 04 2022, 16:21:48')
  }
]
  
  return (
    <Container>
      <TituloCampanhas>Campanhas Recentes</TituloCampanhas>
      <ContainerCampanhas>
        {Campanhas.map((item) => (
          <LinkContainer key={item.id} to={`/details/${item.id}`}>
            <DivCampanha>
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
          </LinkContainer>
        ))}
      </ContainerCampanhas>
    </Container>
  )
}

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.auth
})

export default connect(mapStateToProps)(Home)