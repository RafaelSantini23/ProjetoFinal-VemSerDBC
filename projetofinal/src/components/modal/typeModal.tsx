import Donate from "./Donate";
import EditCampaign from "./editCampaign";



export const changeModal = (modal: string, onClick: () => void ) => {
    switch(modal) {
        case 'donate':
            return <Donate onClick={onClick} />
        case 'editCampaign':
            return <EditCampaign />
        default:
            return <div> Modal notFound </div>
    }
   
}