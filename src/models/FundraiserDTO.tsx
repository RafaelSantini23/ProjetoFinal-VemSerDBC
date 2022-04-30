import { CategoryDTO } from "./CategoryDTO"
import { UserDTO } from "./UserDTO"

export interface FundraiserDTO {
  campaign: {
    automaticClose: boolean | string | null,
    categories: any | string,
    endingDate: string,
    coverPhoto?: string | null | number,
    description: string,
    goal: number | string,
    title: string,
  }
}