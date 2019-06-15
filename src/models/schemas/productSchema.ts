import { Schema, model, Document } from "mongoose";
import { IProduct } from "../interfaces/product";

import autoIncrement = require('mongoose-auto-increment');
import mongoosePaginate = require('mongoose-paginate');
import { Campaign } from "./campaignSchema";

const productSchema = new Schema({
  name: { type: String },
  description: { type: String },
  size: { type: String, default: 'none', enum: ['none', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'] },
  category: { type: String },
  tag: { type: [String] },
  price: { type: Number },
  discounted_price: { type: Number },
  image: { type: String },
  thumbnail: { type: String },
  campaign: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  display: { type: Boolean, default: true },
}, { timestamps: true });
;
productSchema.index({ name: 'text', description: 'text', category: 'text' }, { weights: { name: 4, description: 1, category: 5 } })

mongoosePaginate.paginate.options = {
  lean: true,
  limit: 50,
  page: 1

};

// productSchema.pre('save', function (next) {
//   const product: any = this;
//   if (product.campaign) {
//     let campaign;
//     Campaign.findById(product.campaign).then(_campaign => {
//       if (!_campaign) return next();
//       campaign = _campaign;
//       product.calDiscountPrice(campaign)     
//     })
//       .catch((err) => { return next(err) });
//   } else {
//     return next();
//   }
// });

productSchema.methods.calDiscountPrice = function (campaign) {
  if (!campaign) return;
  if (campaign.status == 'inactive') {
    this.discounted_price = 0;
    this.campaign = null;
    return;
  }
  let type = campaign.type; 
  let value =  campaign.discount_value
  switch (type) {
    case 'discount_by_percent':
      this.discounted_price = roundThousand(this.price - (this.price * value));
      break;
    case 'discount_by_value':
      this.discounted_price = roundThousand(this.price - value);
      break;
    case 'same_price':
      this.discounted_price = value;
      break;
    default:
      this.discounted_price = 0;
      break;
  }
  if (this.discounted_price < 0) {
    this.discounted_price = 0;
  }
}

productSchema.plugin(mongoosePaginate);

productSchema.plugin(autoIncrement.plugin, {
  model: 'Product',
  field: 'serialNum',
  startAt: 14241,
});

export interface IProductModel extends IProduct, Document {
}

export const Product = model<IProductModel>('Product', productSchema);

function round(num) {
  return Math.round((num + 0.00001) * 100) / 100;
}

function roundThousand(num) {
  return Math.round((num + 0.00001) * 0.001) / 0.001;
}