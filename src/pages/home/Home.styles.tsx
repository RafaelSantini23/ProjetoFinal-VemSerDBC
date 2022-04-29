import styled from "styled-components";
import { Link } from "react-router-dom";
import ImgCampanhaPrincipal from '../../imgs/background.png'
import Theme from "../../theme";
import Select from 'react-select'

export const DivSelects = styled.div`
  display: flex;
  height: 38px;
  width: 100%;
  background: transparent;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
`;

export const DivHeaderTitle = styled.div`
  height: 100%;
  width: 100%;
  background: #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DefaultSelect = styled(Select)<{
  width?: string
}>`
  width: ${props => props.width};
`;

export const Container = styled.div`
  background-color: #E5E5E5;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  min-height: 80vh;
  align-items: center;
  justify-content: center;
`;

export const ContainerCampanhas = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 20px;
  gap: 50px;
  position: relative;
`;

export const TituloCampanhas = styled.h1`
  color: #6c757d;
  /* margin-left: 80px; */
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
  position: relative;
  `

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 420px;

  
`

export const ButtonHome = styled.button<{colors?: string}>`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    font-weight: 500;
    background: ${Theme.colors.secondary};
    color: #fff;
    padding: 0 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    cursor: pointer;
    border: 0;
    transition: 0.8s;
    &:hover {
        filter: brightness(0.9);
        background-color: ${Theme.colors.secondary};
    }
    margin: 0 10px;
    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);


`