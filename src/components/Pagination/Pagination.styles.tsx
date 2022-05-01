import styled from "styled-components";
import Theme from "../../theme";

export const MenuPaginate = styled.ul`
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
`;

export const ItemPaginate = styled.li<{
  backColor?: string;
}>`
  background-color: ${props => props.backColor};
  border-radius: 6px;
  min-width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  list-style-type: none;
  text-align: center;
  cursor: pointer;
  transition: .5s;

  :hover {
    background-color: ${Theme.colors.dark};
    a {color: white}
    border-radius: 5px;
    transform: scale(1.1);
  }

`;
  

export const NumPage = styled.a`
  color: black;
  width: 100%;
  height: 100%;
  padding: 4px 8px;
  text-align: center;
`;

export const ButtonPage = styled.button`
  background-color: #ddd;
  min-width: 20px;
  border-radius: 8px;
  padding: 4px 8px;
  margin: 0 5px;
  text-align: center;
  cursor: pointer;
  color: black;
  border: none;
  font-size: 18px;
  transition: .7s;

  :hover {
    background-color: ${Theme.colors.dark};
    border-radius: 5px;
    color: white;
  }

  :disabled {
    background-color: #898b8d;
    color: #5e6166;
  }

`;