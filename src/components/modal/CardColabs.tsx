import { 
    ColabInfo, 
    ColabName, 
    ImgModal, 
    ModalColab 
} from "./Modal.styles";
import { NotContributors } from "../../Global.styles";
import { ContainerModal } from "./CardColab.styles";
import { convertImage64, firstUpper } from "../../utils/Utils";
import { Colabs } from "../../types/Types";
import DefaultImage from '../../images/defaultImage.jpeg';

function CardColabs({colabs}: Colabs) {
  return (
    <ContainerModal width={colabs.length  > 6 ? 'scroll' : 'hidden' } >
        {colabs?.length ? colabs?.map((child, index) => (
            <ModalColab key={index}>
                        <ColabInfo>
                            <ImgModal src={child.profilePhoto ? convertImage64(child.profilePhoto) : DefaultImage} alt="profile" />
                            <ColabName>
                                 {firstUpper(child.name)}
                            </ColabName>
                        </ColabInfo>
            </ModalColab>
                )) : <NotContributors> Não há colaboradores </NotContributors>}
    </ContainerModal>
  )
}
export default CardColabs