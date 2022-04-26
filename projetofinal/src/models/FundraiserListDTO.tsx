import { UsersCreateDTO } from "./UsersCreateDTO"

export interface FundraiserListDTO {
  campaignList: {
    automaticClose?: boolean,
    categories: [{
      categoryId: number
      name: string
    }],
    endingDate?: string,
    coverPhoto: string,
    description: string,
    goal: number,
    title: string,
    currentValue: number,
    fundraiserCreator: UsersCreateDTO['user'],
    fundraiserId?: number,
    lastUpdate: string
  }[],
  loading?: boolean
}