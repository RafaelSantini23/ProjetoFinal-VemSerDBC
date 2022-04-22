export interface AuthDTO {
    auth: {
        login: string;
        password: string;
        token?: string;
        isLogged?: boolean;
        loading?: boolean;
    }
}