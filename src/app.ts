import * as express from "express";
import * as bodyParser from "body-parser";
import { mongoose } from './config/mongooseConnection';
import registerHBSHelpers from "./lib/hbsHelpers";
import './migration/adminUser';
import { redirectWithQuery } from "./lib/httpHelpers";

const subdomain = require('express-subdomain');

mongoose;

const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const requestIp = require('request-ip');
const expressValidator = require('express-validator');

global['currentUser'] = null;

class App {

  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(favicon(path.join(__dirname, '../public', 'favicon.png')));
    this.app.use(require('less-middleware')(path.join(__dirname, '../public')));
    this.app.use(express.static(path.join(__dirname, '../bower_components')));
    this.app.use(express.static(path.join(__dirname, '../public')));
    this.app.use(expressValidator());
    this.app.use(cookieParser());
    this.app.use(requestIp.mw());
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.set('view engine', 'hbs');
    const hbs = require('hbs');
    hbs.registerPartials(path.join(__dirname, '../views/partials'), () => {
    });
    registerHBSHelpers(hbs);

    //route
    let route = this.app.use('/', require('./controllers/index'));
    this.app.use(subdomain('admin', route))

    // production error handler
    this.app.use((err, req, res, next) => {
      const status = err.status || 500;
      // const loglevel = err.loglevel || (status == 500 ? 'error' : 'warn');
      // (logger as any).logErrorReq(loglevel, err, req);      

      res.status(status);
      if (req.url.startsWith('/api'))
        res.json({
          success: false,
          message: err.message,
          meta: err.errors,
        });
      else {
        // if (status == 400 || status == 402) {
        //   res.render('error/400', { message: err.message });
        // } else {
        //   res.render('error/5xx', { message: err.message });
        // }
        // Check status 401
        if (status == 401) {
          res.render('login');
          return;
        }
      }
    });
  }

}

export default new App().app;