import { ButtonHTMLAttributes } from "react"
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

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode,
    colabs?: {
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
            </Content>
            </ModalPrincipal>
    </ModalContainer>
  )
}
export default Modal