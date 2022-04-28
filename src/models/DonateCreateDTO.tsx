export interface DonateCreateDTO {
    donate: {
        message?: string;
        value: number | string ;
    },
    
    onClick?: () => void;
}