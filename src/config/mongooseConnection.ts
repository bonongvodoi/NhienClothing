import * as config from '../config/config';
import mongoose = require("mongoose");
import autoIncrement = require('mongoose-auto-increment');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, { useNewUrlParser: true });
autoIncrement.initialize(mongoose.connection);

export { mongoose };