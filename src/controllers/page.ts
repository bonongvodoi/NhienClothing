import { Product } from "../models/schemas/productSchema";

const Router = require('express').Router();

Router.get('/login', (req, res) => {
  res.render('login', {layout: false});
});

module.exports = Router;
