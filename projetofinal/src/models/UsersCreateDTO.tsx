import { FileDTO } from './FileDTO';

export interface UsersCreateDTO {
  user: {
      email: string;
      login: string;
      password: string;
      confirmPassword?: string;
      profilePhoto?: FileDTO | string;
  }
}