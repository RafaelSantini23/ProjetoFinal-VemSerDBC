import { CategoryDTO } from "./CategoryDTO"

export interface FundraiserDTO {
  campaign: {
    automaticClose: boolean | string | null,
    categories: any | string,
    endingDate?: string,
    coverPhoto?: string | null,
    description: string,
    goal: any | string,
    title: string,
    contributors?: [],
    fundraiserId?: number
  }
}