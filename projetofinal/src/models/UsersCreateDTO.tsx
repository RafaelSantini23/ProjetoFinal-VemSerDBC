import { FileDTO } from './FileDTO';

export interface UsersCreateDTO {
  user: {
      email: string;
      name: string;
      password: string;
      confirmPassword?: string;
      profilePhoto?: any;
  }
}