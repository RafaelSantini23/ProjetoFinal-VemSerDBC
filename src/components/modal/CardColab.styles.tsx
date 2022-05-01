import styled from "styled-components"

export const ContainerModal = styled.div<{width: any}>`
    overflow-y: ${props => props.width};
    height: 100%;

    
    ::-webkit-scrollbar-track { 
    box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    border-radius: 10px;
    background-color: #F5F5F5; 
    }

    ::-webkit-scrollbar-thumb {      
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    background-color: #bdbdbdc9 
    }

    ::-webkit-scrollbar{ 
    width: 8px;
    background-color: #F5F5F5;
 }
`