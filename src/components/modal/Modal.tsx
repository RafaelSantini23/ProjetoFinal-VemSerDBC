import React, { ButtonHTMLAttributes, MouseEventHandler } from "react"
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
} from "./Modal.styles"
import { changeModal } from "./typeModal";




type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode,
    typeModal?: string,
    height: string,
    values?: [],
    onClick?: any,
    id?: string,
    colabs?: any,

}

function Modal({ id = 'modal',  onClick, height, typeModal, colabs }: ButtonProps ) {
    

    const handleOutsideClick = (e: any) => {
        if (e.target.id === id) {
            onClick?.()
        }
    }

  return (
    <ModalContainer id={id} onClick={handleOutsideClick} >
        <ModalPrincipal >
        <HeaderModal>
            <ButtonClose onClick={onClick}> <IconClose /> </ButtonClose> 
        </HeaderModal>
        <Content height={`${height}`} >
                <>
                    {typeModal &&  changeModal?.(typeModal, onClick, colabs) }              
                </> 
            </Content>
            
            </ModalPrincipal>
    </ModalContainer>
  )
}
export default Modal

