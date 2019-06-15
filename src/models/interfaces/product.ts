export interface IProduct {
  serialNum: number,
  name: string,
  description: string,
  size: string,
  category: string,
  tag: string[],
  price: number,
  discounted_price: number,
  image: string,
  thumbnail: string,
  campaign: any,
  display: boolean,
  paginate: any,
  calDiscountPrice(campaign): void
}