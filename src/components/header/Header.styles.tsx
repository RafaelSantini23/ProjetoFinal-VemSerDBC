import styled from "styled-components";
import Theme from "../../theme";


export const HeaderStyle = styled.header`
    display: flex;
    height: 80px;
    background-color: ${Theme.colors.dark};
`
export const NavBar = styled.nav`
    display: flex;
    width: 100%;
    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
`


export const Lista = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 98%;
    position: relative;
`

export const ItemStyles = styled.li`
    display: flex;
    align-items: center;
    padding: 0 12px;
    list-style-type: none;
    height: 100%;

`

export const ItensStyle = styled.div`
    display: flex;
    align-items: center;
`

