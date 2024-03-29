export interface ICampaign {
  name: string,
  description: string,
  type: string,
  discount_value: number,
  order_min_value: number,
  start_date: Date,
  end_date: Date,
  expired: boolean,
}