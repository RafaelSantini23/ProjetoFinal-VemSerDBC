import styled from "styled-components";

export const Container = styled.div`
  background-color: #E5E5E5;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const ContainerCampanhas = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 120px;
  gap: 50px;
`;

export const TituloCampanhas = styled.h1`
  color: #6c757d;
  margin-bottom: 20px;
`;

export const DivCampanha = styled.div`
  background-color: white;
`;

export const ImgCampanha = styled.img`
  width: 100%;
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