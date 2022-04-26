import styled from "styled-components";
import { Link } from "react-router-dom";
import ImgCampanhaPrincipal from '../../imgs/background.png'


export const Container = styled.div`
  background-color: #E5E5E5;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const ContainerCampanhas = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 120px;
  gap: 50px;
  position: relative;
`;

export const TituloCampanhas = styled.h1`
  color: #6c757d;
  margin-bottom: 5px;
  margin-top: 15px;

`;

export const DivCampanha = styled.div`
  background-color: #FFF;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
  width: 350px;
`;

export const ImgCampanha = styled.img`
  width: 100%;
  height: 200px;
`;

export const DivCategoria = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const TotalSpan = styled.span<{
  color?: string
}>`
  color: ${props => props.color};
  margin-left: 10px;
`;

export const LinkContainer = styled(Link)`
  text-decoration: none;
  color: black;
  transition: 0.8s;
  :hover {
    transform: scale(1.1);
  }
`;

export const ContainerMyCampaign = styled.div`
  width: 100%;
  height: 450px;
  background: url(${ImgCampanhaPrincipal}) no-repeat fixed top 10% center;
  display: flex;
  justify-content: center;
  align-items: center;
  `

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
`