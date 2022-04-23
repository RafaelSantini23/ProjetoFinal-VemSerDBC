import { converteNumber, formataData, somaTotal, converteBRL, formataTags } from "../../utils/Utils";
import { 
  ButtonContainer,
  Container,
  ContainerMyCampaign,
  TituloCampanhas,
} from "./Home.styles";
import 'moment/locale/pt-br'
import Card from "../../components/card/Card";
import ImgCampanhaPrincipal from '../../imgs/background.png'
import { ButtonForm } from "../../Global.styles";
import Theme from "../../theme";



function Home()  {

  const token = localStorage.getItem('token');

  const tokenn = token?.split('.')[1];
  const decoded = JSON.parse(window?.atob(tokenn as string));

  const id = decoded.sub
  

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
    <>
      <ContainerMyCampaign>
        <ButtonContainer>
          <ButtonForm colors={`${Theme.colors.secondary}`}> Minhas Campanhas </ButtonForm>
        </ButtonContainer>
      </ContainerMyCampaign>
    <Container>  
      <TituloCampanhas>Campanhas Recentes</TituloCampanhas>
      <Card colabs={Campanhas} />
    </Container>
    </>
  )
}



export default Home