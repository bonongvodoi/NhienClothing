import { Product } from "../models/schemas/productSchema";
import { isAuthenticated } from "../lib/auth";

const Router = require('express').Router();

const CACHE_EXPIRY = 3600;

Router.get('/', isAuthenticated, (req, res) => {
  res.render('index');
});
Router.get('/print-order', isAuthenticated, (req, res) => {
  res.render('printOrder');
});
Router.get('/product', isAuthenticated, (req, res) => {
  res.render('product');
});
Router.get('/edit-product', isAuthenticated, (req, res) => {
  res.render('editProduct');
});
Router.get('/edit-product/:id', isAuthenticated, (req, res) => {
  let id = req.params.id;
  if (id) {
    let query = buildQuery(id);
    Product.findOne(query).then(_product => {
      let product = _product;
      res.render('editProduct', product);
      return;
    }).catch(() => {
      res.render('editProduct', {});
    })
  } else {
    res.render('editProduct', {});
  }  
});
Router.get('/campaign', isAuthenticated, (req, res) => {
  res.render('campaign');
});
Router.get('/edit-campaign', isAuthenticated, (req, res) => {
  res.render('editCampaign');
});
Router.get('/order', isAuthenticated, (req, res) => {
  res.render('order');
});
Router.get('/statistics-1', isAuthenticated, (req, res) => {
  res.render('statistics1');
});
Router.get('/statistics-2', isAuthenticated, (req, res) => {
  res.render('statistics2');
});
function buildQuery(id) {
  const query: any = {};
  if (id) {
    if (isNaN(id)) {
      query['_id'] = id;
    } else {
      query['serialNum'] = id;
    }
  }
  return query;
}

module.exports = Router;