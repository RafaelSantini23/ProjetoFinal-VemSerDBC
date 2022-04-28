import { ColabInfo, ColabName, ImgModal, ModalColab } from "./Modal.styles";
import DefaultImage from '../../imgs/defaultImage.jpeg';
import { NotContributors } from "../../Global.styles";

type Colabs = {
    colabs?: {
        id: string,
        name: string,
        photo: string;
    }[],
}


function CardColabs({colabs}: Colabs) {
  return (
    <div>
        {colabs?.length ? colabs?.map((child) => (
            <ModalColab>
                        <ColabInfo>
                            <ImgModal width='100px' src={child.photo ? child.photo : DefaultImage} alt="profile" />
                            <ColabName>
                                {child.name}
                            </ColabName>
                        </ColabInfo>
                    </ModalColab>
                ) ) : <NotContributors> No colabs </NotContributors>}
    </div>
  )
}
export default CardColabs