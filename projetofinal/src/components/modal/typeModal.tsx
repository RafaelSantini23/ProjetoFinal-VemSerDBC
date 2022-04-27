import Donate from "./Donate";
import { useParams } from "react-router-dom";
import { FundraiserDTO } from "../../models/FundraiserDTO";
import EditCampaign from "./EditCampaign";


export const changeModal = (modal: string, onClick: () => void ) => {
    switch(modal) {
        case 'donate':
            return <Donate onClick={onClick}  />
        case 'editCampaign':
            return <EditCampaign  />
        default:
            return <div> Modal notFound </div>
    }
   
}