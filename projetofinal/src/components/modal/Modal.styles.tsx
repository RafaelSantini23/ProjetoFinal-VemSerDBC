import styled from "styled-components";
import { IoMdClose } from "react-icons/io"


export const ModalContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;

`


export const BackGroundModal = styled.div`
    background: rgb(71, 71, 71);
    height: 100vh;
`

export const ButtonClose = styled.button`
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    text-align: right;
`

export const Content = styled.div`
    width: 100%;
    height: 550px;
  
    ::-webkit-scrollbar {
    width: 10px;
    }

    
    ::-webkit-scrollbar-track {
    background: #f1f1f1; 
    }
    
 
    ::-webkit-scrollbar-thumb {
    background: #888; 
    }

   
    ::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }

`

export const ModalPrincipal = styled.div`
    background-color: #fff;
    color: #000;
    width: 40%;
    height: 55%;
    border-radius: 20px;

`

export const HeaderModal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;


`

export const IconClose = styled(IoMdClose)`
    font-size: 34px;
    margin-top: 10px;
`

export const ImgModal = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 100%;
`

export const ModalColab = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    margin: 0 20px;
    padding: 8px;

`

export const ColabInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`

export const ColabName = styled.span`
    font-size: 18px;
    font-weight: bold;
    margin-left: 10px;

`