import styled from "styled-components";
import Theme from '../../theme';

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

export const ContainerDetails = styled.div`
  display: flex;
  gap: 30px;
  padding: 20px;
`;

export const DivCampanha = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  gap: 30px;
  `;

export const ImagemCampanha = styled.img`
  width: 100%;
  height: 400px;
  border: 2px solid black;
  border-radius: 4px;
`;

export const DivImagem = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 6px;
`;

export const DescCampanha = styled.div`
  background-color: white;
  width: 100%;
  min-height: 300px;
  border-radius: 6px;
`;

export const HeaderDesc = styled.p`
  background-color: ${Theme.colors.dark};
  color: ${Theme.colors.light};
  text-align: center;
  font-size: 24px;
  width: 100%;
  height: 40px;
  border-radius: 6px 6px 2px 2px;
`;


export const MsgDesc = styled.div`
  width: 100%;
  min-height: 80%;
  padding: 20px;
`;

export const InfoCampanha = styled.div`
  position: sticky;
  top: 1%;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 330px;
  height: 400px;
  padding: 20px;
  border-radius: 6px;
`;

export const TotalTitle = styled.h1<{
  color?: string,
}>`
  color: ${props => props.color};
  font-size: 38px;
`;