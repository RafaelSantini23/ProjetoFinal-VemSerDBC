import { CategoryDTO } from "./CategoryDTO"

export interface FundraiserDTO {
  campaign: {
    automaticClose: boolean | string | null,
    categories: CategoryDTO['categories'] | string,
    endingDate?: string,
    coverPhoto?: File | string,
    description: string,
    goal: any | string,
    title: string,
    contributors?: [],
    fundraiserId?: number
  }
}