import CardColabs from "./CardColabs";
import EditCampaign from "./EditCampaign";
import Donate from "./Donate";

export const changeModal = (modal: string, onClick: () => void, colabs: any ) => {
    switch(modal) {
        case 'donate':
            return <Donate onClick={onClick}  />
        case 'editCampaign':
            return <EditCampaign onClick={onClick}   />
        case 'cardColabs':
            return <CardColabs colabs={colabs} />
        default:
            return <div> Modal notFound </div>
    }
   
}