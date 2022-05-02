import { 
    ColabInfo, 
    ColabName, 
    ImgModal, 
    ModalColab 
} from "./Modal.styles";
import { NotContributors } from "../../Global.styles";
import { ContainerModal } from "./CardColab.styles";
import DefaultImage from '../../images/defaultImage.jpeg';

type Colabs = {
    colabs: {
        id: string,
        name: string,
        photo: string;
    }[],
}


function CardColabs({colabs}: Colabs) {
  return (
      
    <ContainerModal width={colabs.length  > 4 ? 'scroll' : 'hidden' } >
        {colabs?.length ? colabs?.map((child) => (
            <>
            <ModalColab>
                        <ColabInfo>
                            <ImgModal width='100px' src={child.photo ? child.photo : DefaultImage} alt="profile" />
                            <ColabName>
                                 {child.name}
                            </ColabName>
                        </ColabInfo>
            </ModalColab>
            
            </>
                ) ) : <NotContributors> Não há colaboradores </NotContributors>}
    </ContainerModal>
  )
}
export default CardColabs