import CardColabs from "./CardColabs";
import Donate from "./Donate";
import EditCampaign from "./EditCampaign";

type Colabs = {
    colabs?: {
        id: string,
        name: string,
        photo: string;
    }[],
}


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