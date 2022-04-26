import { ContainerCampanhas, DivCampanha, DivCategoria, ImgCampanha, LinkContainer, TotalSpan } from "../../pages/home/Home.styles";
import { converteBRL, converteNumber, formataCorTotal, formataData, formataTags, somaTotal } from "../../utils/Utils"
import { Meta, MetaAtingida } from "./Card.styles";

type Card = {
    children?: React.ReactNode,
    colabs: {
        id: number,
        foto: string,
        titulo: string;
        meta: string | number;
        total: string | number;
        criador: string;
        categoria: string;
        data: string;
    }[],
}


function Card({ children, colabs }: Card) {


  return (
    
        <ContainerCampanhas>
         {colabs.map((item) => (
          <LinkContainer key={item.id} to={`/details/${item.id}`}>
            <DivCampanha>
              <Meta>
                  { item.total >= item.meta && ( <MetaAtingida> Meta atingida</MetaAtingida> )}
              </Meta>
              <ImgCampanha src={item.foto} alt="foto" />
              <h2>{item.titulo}</h2>
              <DivCategoria>
                <span>{item.categoria}</span>
                <small>ID da campanha: {item.id}</small>
              </DivCategoria>
              <h4>{item.criador}</h4>
              <p>Total Arrecadado: 
                <TotalSpan color={formataCorTotal(item.meta as number, item.total as number)}>
                {converteBRL(item.total)}</TotalSpan>
                </p>
              <p>Meta: <span>{converteBRL(item.meta)}</span></p>
              <small>Última data de alteração: {item.data}</small>
            </DivCampanha>
          </LinkContainer>
        ))}
        </ContainerCampanhas>

  )
}
export default Card 