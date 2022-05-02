import styled from "styled-components";
import Theme from "../../theme";

export const ImgProfile = styled.img<{src?: any}>`
    height: 60px;
    width: 70px;
    border-radius: 100%;
    src: url(${props => props.src});
`

export const ItemProfile = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const TituloProfile = styled.h2 `
    width: 100%;
    margin: 0 10px;
    color: #fff;
    font-size: 20px;
`

export const ButtonProfile = styled.button`
    width: 25%;
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
    :disabled {
        background-color: ${Theme.colors.secondary};
    }

`

export const DivMenu = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0 0 20px;
`