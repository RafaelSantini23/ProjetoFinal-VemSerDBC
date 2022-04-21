export interface AuthDTO {
    auth: {
        login: string;
        senha: string;
        token?: string;
        isLogged?: boolean;
        loading?: boolean;
    }
}