export interface UsersCreateDTO {
  userCreate: {
      nome: string;
      email: string;
      senha: string;
      confirmasenha?: string;
      foto?: string;
  }
}