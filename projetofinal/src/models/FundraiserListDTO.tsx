import { UsersCreateDTO } from "./UsersCreateDTO"

export interface FundraiserListDTO {
  campaignList: {
    automaticClose?: boolean,
    categories: string[],
    endingDate?: string,
    coverPhoto?: string,
    description: string,
    goal: number,
    title: string,
    currentValue: number,
    fundraiserCreator: UsersCreateDTO,
    funraiserId?: number,
    lastUpdate?: string
  }[]
}