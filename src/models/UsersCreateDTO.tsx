import { FileDTO } from './FileDTO';

export interface UsersCreateDTO {
  user : {
      email: string;
      login: string;
      password: string;
      name?: string;
      confirmPassword?: string;
      profilePhoto?: FileDTO | string | null;
  }
  navigateTo?: boolean;
  loading?: boolean;
  setPass?: boolean;
}