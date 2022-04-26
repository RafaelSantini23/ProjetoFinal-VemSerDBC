import Donate from "./Donate";
import EditCampaign from "./editCampaign";

export const changeModal = (modal: string) => {
    switch(modal) {
        case 'donate':
            return (<Donate />) 
        case 'editCampaign':
            return (<EditCampaign />)
        default:
            return (<div>Modal not found</div>)
    }
}