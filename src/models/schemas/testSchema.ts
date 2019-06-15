import { Schema, model, Document } from "mongoose";
import { ITest } from "../interfaces/test";

import autoIncrement = require('mongoose-auto-increment');

const testSchema = new Schema({
  name: { type: String },
  age: {type: Number}
});

testSchema.plugin(autoIncrement.plugin, {
  model: 'Test',
  field: 'serialNum',
  startAt: 100000,
});

export interface ITestModel extends ITest, Document {
}

export const Test = model<ITestModel>('Test', testSchema);