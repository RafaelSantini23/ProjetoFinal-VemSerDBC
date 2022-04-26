import { Field, Form, Formik } from "formik";
import React, { ButtonHTMLAttributes } from "react"
import { ButtonForm } from "../../Global.styles";
import { ButtonClose,
    Content,
    ImgModal,
    ColabName,
    ColabInfo,
    IconClose,
    ModalColab,
    HeaderModal,
    ModalContainer,
    ModalPrincipal,
    InputDonation,
    ContainerDonation,
    InputCurrency,
} from "./Modal.styles"
import Theme from "../../theme";
import { numberMask } from "../../utils/Utils";
import { changeModal } from "./typeModal";



type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode,
    colabs?: {
        id: string,
        name: string,
        photo: string;
    }[],
    typeModal?: string,
    height: string,
    values?: []
    

}


function Modal({  onClick, colabs, height, typeModal, values }: ButtonProps ) {
    
  return (
    <ModalContainer>
        <ModalPrincipal >
        <HeaderModal>
            <ButtonClose onClick={onClick}> <IconClose /> </ButtonClose> 
        </HeaderModal>
        <Content height={`${height}`} >
                {colabs?.map((child) => (
                    <ModalColab>
                        <ColabInfo>
                            <ImgModal width='250px' src={child.photo} alt="profile" />
                            <ColabName>
                                {child.name}
                            </ColabName>
                        </ColabInfo>
                        {typeModal && ( changeModal(typeModal) )}              
                    </ModalColab>
                ))}

                    
            </Content>
            
            </ModalPrincipal>
    </ModalContainer>
  )
}
export default Modal

