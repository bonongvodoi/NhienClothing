export interface IOrder {
  orderDate: string;
  orderHour: string;
  grandPrice: number;
  discountPrice: number
  orderDetail: any;
  total: number;
  totalInText: string;
  byWho: string;
  note: string;
}