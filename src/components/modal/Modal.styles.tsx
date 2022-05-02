import { IoMdClose } from "react-icons/io";
import { Field } from "formik";
import styled from "styled-components";
import MaskedInput from "react-text-mask";


export const ModalContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    position: fixed;
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
    min-height: 100vh;
`

export const ButtonClose = styled.button`
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    text-align: right;
`

export const Content = styled.div<{height?: string}>`
    width: 100%;
    height: ${props => props.height};
  
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

export const ModalPrincipal = styled.div<{ width?: string }>`
    background-color: #fff;
    color: #000;
    width: ${props => props.width};
    height: 55%;
    border-radius: 20px;
    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
    animation: fadein .5s;
   
    @keyframes fadein {
	from {
		opacity:0;
	}
	to {
		opacity:1;
	}
  }

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
    width: 70px;
    height: 70px;
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

export const ContainerDonation = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
`

export const InputDonation = styled(Field)`
    width: 50%;
`


// input com currency format e atributos de conversão para moeda brasileira

export const InputCurrency = styled(MaskedInput)`
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    background-color: #fff;
    border: 1px solid #ccc;
    margin-bottom: 15px;
`


