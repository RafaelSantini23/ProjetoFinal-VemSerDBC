export interface FundraiserDTO {
  campaign: {
    automaticClose: boolean | string | null,
    categories: string | string[],
    endingDate?: string,
    coverPhoto?: string,
    description: string,
    goal: string | number,
    title: string
  }
}