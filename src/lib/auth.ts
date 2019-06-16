import { Handler } from 'express';
import * as config from '../config/config';
import { AppError } from '../models/AppError';
const jwt = require('jsonwebtoken');

export const authenticateUser: Handler = async (req, res, next) => {
  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['authorization'];

  // decode token
  if (token) {
    try {
      (req as any).currentUser = await verifyToken(token);
      return next();
    }
    catch (err) {
      global['currentUser'] = null;
      return next(err);
    }
  } else {
    global['currentUser'] = null;
    return next(new AppError('No token provided', 401));
  }
};

export function verifyToken(token: string) : Promise<{ id: string }> {
  return new Promise((resolve, reject) =>
    jwt.verify(token, config.secret, (err, user) => {
      if (err) reject(new AppError('Invalid credentials, please log in first', 403, err));
      resolve(user);
    }));
}

export async function isAuthenticated(req, res, next) {
  if (global['currentUser']) {    
    try {
      (req as any).currentUser = await verifyToken(global['currentUser'].accessToken);
      return next();
    }
    catch (err) {
      global['currentUser'] = null;
      res.redirect('/page/login');
    }
  } else {
    res.redirect('/page/login');
  }
}