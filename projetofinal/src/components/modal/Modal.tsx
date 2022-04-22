import { ButtonHTMLAttributes } from "react"
import { ButtonClose, ColabInfo, ColabName, Content, HeaderModal, IconClose, ImgModal, ModalColab, ModalContainer, ModalPrincipal } from "./Modal.styles"
import { IoMdClose } from "react-icons/io"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode,
    colabs: {
        id: string,
        name: string,
        photo: string;
    }[],
}




function Modal({  onClick, colabs }: ButtonProps ) {
  return (
    <ModalContainer>
        <ModalPrincipal>
        <HeaderModal>
            <ButtonClose onClick={onClick}> <IconClose /> </ButtonClose> 

        </HeaderModal>

        <Content>
                {colabs.map((child) => (
                    <ModalColab>
                        <ColabInfo>
                            <ImgModal width='250px' src={child.photo} alt="" />
                            <ColabName>
                                {child.name}
                            </ColabName>
                        </ColabInfo>
                    </ModalColab>
                ))}
            </Content>
            </ModalPrincipal>
    </ModalContainer>
  )
}
export default Modal