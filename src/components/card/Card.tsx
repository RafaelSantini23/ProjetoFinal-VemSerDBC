import { useEffect } from "react";
import { FundraiserListDTO } from "../../models/FundraiserListDTO";
import { ContainerCampanhas, DivCampanha, DivCategoria, ImgCampanha, LinkContainer, TotalSpan } from "../../pages/home/Home.styles";
import { converteBRL, formataCorTotal, formataData, convertImage64 } from "../../utils/Utils"
import { Meta, MetaAtingida } from "./Card.styles";


function Card({campaignList}: FundraiserListDTO) {
  const token = localStorage.getItem('token');

  const tokenn = token?.split('.')[1];
  const decoded = JSON.parse(window?.atob(tokenn as string));

  const id = decoded.sub

    
    
    


  return (
    
        <ContainerCampanhas>
         { campaignList.length ? campaignList.map((item) => (
          <LinkContainer key={item.fundraiserId} to={`/details/${item.fundraiserId}`}>
            <DivCampanha>
              <Meta>
                  { item.currentValue >= item.goal && ( <MetaAtingida mT="100px"> Meta atingida</MetaAtingida> )}
              </Meta>
              <ImgCampanha src={convertImage64(item.coverPhoto)} alt="foto" />
              <h2>{item.title}</h2>
              <DivCategoria>
                <span>{item.categories.map(category => (
                  <span key={category.categoryId}>{category.name} </span>
                ))}</span>
                <small>ID da campanha: {item.fundraiserId}</small>
              </DivCategoria>
              <h4>{item.fundraiserCreator.name}</h4>
              <p>Total Arrecadado: 
                <TotalSpan color={formataCorTotal(item.goal as number, item.currentValue as number)}>
                {converteBRL(item.currentValue)}</TotalSpan>
                </p>
              <p>Meta: <span>{converteBRL(item.goal)}</span></p>
              <small>Última data de alteração: {formataData(item.lastUpdate)}</small>
            </DivCampanha>
          </LinkContainer>
        )): <p>Nenhuma campanha encontrada</p>}
        </ContainerCampanhas>

  )
}
export default Card 