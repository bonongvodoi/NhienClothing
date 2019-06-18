import { Handler } from 'express';
import * as config from '../config/config';
import { AppError } from '../models/AppError';
import { ROLE_ROUTE } from '../config/authRoute';
const jwt = require('jsonwebtoken');

export const authenticateUser: Handler = async (req, res, next) => {
  // check header or url parameters or post parameters for token
  //let token = req.body.token || req.query.token || req.headers['authorization'];
  let token = req.cookies['access_token'];

  // decode token
  if (token) {
    try {
      (req as any).currentUser = await verifyToken(token);
      // if (!verifyRole((req as any).currentUser, (req as any).url))
      //   return next(new AppError('Invalid Role', 401));
      return next();
    }
    catch (err) {
      return next(err);
    }
  } else {
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
  let token = req.cookies['access_token'];
  if (token) {    
    try {
      (req as any).currentUser = await verifyToken(token);
      if (!verifyRole((req as any).currentUser, (req as any).url))
        res.redirect('/page/login');
      return next();
    }
    catch (err) {
      res.redirect('/page/login');
    }
  } else {
    res.redirect('/page/login');
  }
}

function verifyRole(currentUser, url) {
  let routes = ROLE_ROUTE[currentUser.role];
  if (routes) {
    if (routes[0] === 'all') return true;
    if (routes.indexOf(url) === -1)
    return false;
  }
  return true;
}