import { 
    ColabInfo, 
    ColabName, 
    ImgModal, 
    ModalColab 
} from "./Modal.styles";
import { NotContributors } from "../../Global.styles";
import { ContainerModal } from "./CardColab.styles";
import DefaultImage from '../../imgs/defaultImage.jpeg';
import { convertImage64 } from "../../utils/Utils";

type Colabs = {
    colabs: {
        id: string,
        name: string,
        profilePhoto: string;
    }[],
}


function CardColabs({colabs}: Colabs) {
  return (
      
    <ContainerModal width={colabs.length  > 4 ? 'scroll' : 'hidden' } >
        {colabs?.length ? colabs?.map((child) => (
            <>
            <ModalColab>
                        <ColabInfo>
                            <ImgModal src={child.profilePhoto ? convertImage64(child.profilePhoto) : DefaultImage} alt="profile" />
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