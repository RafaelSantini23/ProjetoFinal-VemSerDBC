import { ButtonProps } from "../../types/Types";
import { changeModal } from "./typeModal";
import { ButtonClose,
    Content,
    IconClose,
    HeaderModal,
    ModalContainer,
    ModalPrincipal,
} from "./Modal.styles"

function Modal({ id = 'modal',  onClick, height, width, typeModal, colabs }: ButtonProps ) {
    
    const handleOutsideClick = (e: any) => {
        if (e.target.id === id) {
            onClick?.()
        }
    }

  return (
    <ModalContainer id={id} onClick={handleOutsideClick} >
        <ModalPrincipal width={`${width}`}>
        <HeaderModal>
            <ButtonClose onClick={onClick}> <IconClose /> </ButtonClose> 
        </HeaderModal>
        <Content height={`${height}`}  >
                <>
                    {typeModal &&  changeModal?.(typeModal, onClick, colabs) }              
                </> 
            </Content>
            
            </ModalPrincipal>
    </ModalContainer>
  )
}
export default Modal

