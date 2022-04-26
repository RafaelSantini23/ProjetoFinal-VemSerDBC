export interface FundraiserDTO {
  campaign: {
    automaticClose: boolean | string | null,
    categories: string | string[],
    endingDate?: string,
    coverPhoto?: string,
    description: string,
    goal: any | string,
    title: string
  }
}