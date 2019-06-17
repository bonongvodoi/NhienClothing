import { Schema, model, Document } from "mongoose";
import { ICampaign } from "../interfaces/campaign";

import autoIncrement = require('mongoose-auto-increment');
import mongoosePaginate = require('mongoose-paginate');
import { Product } from "./productSchema";

const campaignSchema = new Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String, default: 'discount_by_percent', enum: ['discount_by_value', 'discount_by_percent', 'same_price', 'order_discount'] },
  discount_value: { type: Number },
  order_min_value: { type: Number},
  start_date: { type: Date, },
  end_date: { type: Date, },
  expired: { type: Boolean, default: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
}, { timestamps: true });

campaignSchema.index({ name: 'text' });

mongoosePaginate.paginate.options = {
  lean: true,
  limit: 50,
  page: 1

};

// campaignSchema.pre('save', function (next) {
//   const campaign: any = this;
//   if (!this.isNew) {
//     Product.find({ campaign: campaign._id }).then(products => {
//       if (!products || products.length == 0) return next();
//       let promises = [];
//       for (let i = 0; i < products.length; i++) {
//         const p = products[i];
//         p.calDiscountPrice(campaign);
//         promises.push(p.save());
//         Promise.all(promises).then(rs => {
//           next();
//         })
//       }
//     })
//   } else {
//     next();
//   }
// });

campaignSchema.plugin(mongoosePaginate);

campaignSchema.plugin(autoIncrement.plugin, {
  model: 'Campaign',
  field: 'serialNum',
  startAt: 100000,
});

export interface ICampaignModel extends ICampaign, Document {
}

export const Campaign = model<ICampaignModel>('Campaign', campaignSchema);