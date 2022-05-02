export interface DonateCreateDTO {
    donate: {
        value: number | string ;
    },
    
    onClick?: () => void;
}