import { Schema, model, Document } from "mongoose";
import { ICategory } from "../interfaces/category";

import autoIncrement = require('mongoose-auto-increment');

const categorySchema = new Schema({
  name: { type: String },
  description: {type: Number}
}, {timestamps: true});

categorySchema.index({name: 'text'});

categorySchema.plugin(autoIncrement.plugin, {
  model: 'Category',
  field: 'serialNum',
  startAt: 100000,
});

export interface ICategoryModel extends ICategory, Document {
}

export const Category = model<ICategoryModel>('Category', categorySchema);