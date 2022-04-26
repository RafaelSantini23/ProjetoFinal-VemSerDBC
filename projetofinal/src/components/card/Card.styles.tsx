import styled from 'styled-components';


export const MetaAtingida = styled.h1<{mT: string}>`
    position: absolute;
    margin-top: ${props => props.mT};
    color: red;


`


export const Meta = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
` 