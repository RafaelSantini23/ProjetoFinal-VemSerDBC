import { UserDTO } from "./UserDTO";
import {CategoryDTO} from "./CategoryDTO";

export interface FundraiserDetailsDTO {
  campaign: {
    automaticClose: boolean,
    categories: CategoryDTO['categories'],
    contributors: [],
    coverPhoto: string,
    currentValue: number,
    description: string,
    fundraiserCreator: UserDTO,
    fundraiserId: number,
    goal: number,
    title: string,
  },
  loadingDonate: boolean,
  loadingDetails: boolean,
  errorDetails: boolean,
}