import { Schema, model, Document } from "mongoose";
import { ITag } from "../interfaces/tag";

import autoIncrement = require('mongoose-auto-increment');

const tagSchema = new Schema({
  name: { type: String },
  description: {type: Number}
}, {timestamps: true});

tagSchema.index({name: 'text'});

tagSchema.plugin(autoIncrement.plugin, {
  model: 'Tag',
  field: 'serialNum',
  startAt: 100000,
});

export interface ITagModel extends ITag, Document {
}

export const Tag = model<ITagModel>('Tag', tagSchema);