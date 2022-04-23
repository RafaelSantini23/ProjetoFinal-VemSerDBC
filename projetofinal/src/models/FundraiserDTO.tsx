export interface FundraiserDTO {
  campaign: {
    automaticClose: boolean,
    categories: string | string[],
    validdate?: string,
    coverPhoto?: string,
    description: string,
    goal: string | number,
    title: string
  }
}