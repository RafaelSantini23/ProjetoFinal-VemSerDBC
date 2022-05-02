import { 
    ColabInfo, 
    ColabName, 
    ImgModal, 
    ModalColab 
} from "./Modal.styles";
import { NotContributors } from "../../Global.styles";
import { ContainerModal } from "./CardColab.styles";
import { convertImage64 } from "../../utils/Utils";
import DefaultImage from '../../images/defaultImage.jpeg';

type Colabs = {
    colabs: {
        id: number,
        name: string,
        profilePhoto: string;
    }[],
}


function CardColabs({colabs}: Colabs) {
  return (
    <ContainerModal width={colabs.length  > 4 ? 'scroll' : 'hidden' } >
        {colabs?.length ? colabs?.map((child) => (
            <ModalColab key={child.id}>
                        <ColabInfo>
                            <ImgModal src={child.profilePhoto ? convertImage64(child.profilePhoto) : DefaultImage} alt="profile" />
                            <ColabName>
                                 {child.name}
                            </ColabName>
                        </ColabInfo>
            </ModalColab>
                )) : <NotContributors> Não há colaboradores </NotContributors>}
    </ContainerModal>
  )
}
export default CardColabs