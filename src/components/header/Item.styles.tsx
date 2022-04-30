import styled from "styled-components";



export const ImgProfile = styled.img<{src?: any}>`
    height: 60px;
    border-radius: 100%;
    src: url(${props => props.src});
`

export const ItemProfile = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const TituloProfile = styled.h2 `
    margin: 0 10px;
    color: #fff;
    margin: 0 10px;
`