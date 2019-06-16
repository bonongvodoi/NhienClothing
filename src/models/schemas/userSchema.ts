import { Schema, model, Document } from "mongoose";
import { IUser } from "../interfaces/user";
import bcrypt = require('bcrypt-nodejs');
import * as config from '../../config/config';
import crypto = require("crypto");
import jwt = require('jsonwebtoken');

import {base64encode} from '../../lib/utils';

import autoIncrement = require('mongoose-auto-increment');

const TOKEN_AGE = '7d';

const userSchema = new Schema({
  email: {
      type: String,
      lowercase: true,
      unique: true
  },
  firstName: {
      type: String
  },
  lastName: {
      type: String
  },
  password: {
      type: String
  },
  role: {
    type: String,
    enum: ['admin', 'salesman'],
    default: 'salesman'
  },
  passwordResetToken: {
      token: {
          type: String
      },
      createdAt: {
          type: Date
      },
      expiredTime: {
          type: String //1h, 5h etc
      }
  },
  facebookUserId: {
      type: String
  },
  magicToken: String,
  auditlog: [{date: Date, message: String}],
}, { timestamps : true });

userSchema.methods.generateMagicToken = function generateMagicToken() {
  this.magicToken = base64encode(crypto.randomBytes(64));
};

userSchema.pre('save', function (next) {
  const user:any = this;

  if (this.isModified('password') || this.isNew) {
      user.generateMagicToken();
      bcrypt.genSalt(10, function (err, salt) {
          if (err) {
              return next(err);
          }
          bcrypt.hash(user.password, salt, null, function (err, hash) {
              if (err) {
                  return next(err);
              }
              user.password = hash;
              next();
          });
      });
  } else {
      return next();
  }
});

userSchema.methods.comparePassword = function (pw) {
  return new Promise((resolve,reject) => {
      bcrypt.compare(pw, this.password, function (err, isMatch) {
          if (err) return reject(err);
          resolve(isMatch);
      });
  })
};

userSchema.methods.getCurrentUser = function () {
  const currentUser = this.getCurrentUserSoft();
  const accessToken = jwt.sign(currentUser, config.secret, { expiresIn: TOKEN_AGE });
  const refreshToken = this._id.toString() + '.' + crypto.randomBytes(40).toString('hex');
  return {
      currentUser,
      accessToken,
      refreshToken
  }
};

userSchema.methods.getCurrentUserSoft = function () {
  return {
      email: this.email,
      id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
  };
};

userSchema.plugin(autoIncrement.plugin, {
  model: 'Users',
  field: 'serialNum',
  startAt: 100000,
});

export interface IUserModel extends IUser, Document {
}

export const Users = model<IUserModel>('Users', userSchema);