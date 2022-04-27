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
    colabs?: {
        id: string,
        name: string,
        photo: string;
    }[],
    typeModal?: string,
    height: string,
    values?: [],
    onClick?: any,
    id?: string,

}

function Modal({ id = 'modal',  onClick, colabs, height, typeModal }: ButtonProps ) {
    

    const handleOutsideClick = (e: any) => {
        if (e.target.id === id) {
            onClick?.()
        }
    }

    console.log(typeModal);
  return (
    <ModalContainer id={id} onClick={handleOutsideClick} >
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
                    </ModalColab>
                ))}
                <>
                    {typeModal &&  changeModal?.(typeModal, onClick) }              
                </> 
            </Content>
            
            </ModalPrincipal>
    </ModalContainer>
  )
}
export default Modal

