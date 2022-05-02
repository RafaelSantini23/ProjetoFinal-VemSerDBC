import styled from "styled-components";
import Theme from '../../theme';
import { FcDonate } from "react-icons/fc";

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

export const TitleCampaign = styled.h1`
  font-size: 24px;
`

export const Raised = styled.h3`
  font-size: 18px;

`

export const Categories = styled.p`
  font-size: 18px;
  font-weight: bold;
`

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
  box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
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
  box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
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
  justify-content: space-between;
  
  background-color: white;
  width: 330px;
  height: 400px;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
`;

export const TotalTitle = styled.h1<{
  color?: string,
}>`
  color: ${props => props.color};
  font-size: 38px;
`;


export const IconDonate = styled(FcDonate)`
  margin: 0 10px;
  font-size: 18px;
`


export const ButtonOwner = styled.button<{colors: string}>`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    font-weight: 500;
    color: white;
    background: ${props => props.colors};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 10px;
    border: 0;
    transition: 0.8s;
    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
    &:hover {
        filter: brightness(0.9);
        background-color: ${Theme.colors.secondary};
    }
    :disabled {
        background-color: #cccccc;
        color: #666666;
    }

`

export const Goal = styled.h2`
  font-size: 18px;
`

export const ParagraphContributors = styled.p`
  font-size: 18px;

`

export const SpanCategories = styled.span`
  font-size: 18px;

`

export const ButtonNavigate = styled.button<{colors: string}>`
    width: 12%;
    height: 40px;
    border-radius: 8px;
    font-weight: 500;
    color: white;
    background: ${props => props.colors};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 10px;
    border: 0;
    transition: 0.8s;
    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
    &:hover {
        filter: brightness(0.9);
        background-color: ${Theme.colors.secondary};
    }
    :disabled {
        background-color: #cccccc;
        color: #666666;
    }

    

`

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: start;

`