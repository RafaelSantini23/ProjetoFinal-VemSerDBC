import Donate from "./Donate";
import EditCampaign from "./EditCampaign";


export const changeModal = (modal: string, onClick: () => void ) => {
    switch(modal) {
        case 'donate':
            return <Donate onClick={onClick}  />

        case 'editCampaign':
            return <EditCampaign onClick={onClick} />

        default:
            return <div> Modal notFound </div>
    }
   
}