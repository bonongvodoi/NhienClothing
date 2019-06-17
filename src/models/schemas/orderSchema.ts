import { Schema, model, Document } from "mongoose";
import { IOrder } from "../interfaces/order";

import autoIncrement = require('mongoose-auto-increment');
import { DocTienBangChu } from "../../lib/utils";

const orderSchema = new Schema({
  orderDate: { type: String },
  orderHour: { type: String },
  grandPrice: { type: Number },
  discountPrice: { type: Number},
  orderDetail: [{
    productId: { type: Number},
    name: { type: String },
    quantity: { type: Number},
    price: { type: Number},
    discount: { type: Number},
    total: { type: Number},
  }],
  total: { type: Number},
  totalInText: { type: String},
  byWho: { type: String},
  note: {type: String}
}, { timestamps: true });

orderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: 'serialNum',
  startAt: 111111,
});

orderSchema.pre('save', function (next) {
  const order: any = this;
  if (order.total && !order.totalInText) {
    order.totalInText = DocTienBangChu(order.total);
  }
  next();  
});

export interface IOrderModel extends IOrder, Document {
}

export const Order = model<IOrderModel>('Order', orderSchema);