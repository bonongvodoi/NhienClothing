import { Product } from "../models/schemas/productSchema";

const Router = require('express').Router();

const CACHE_EXPIRY = 3600;

Router.get('/', (req, res) => {
  res.render('index');
});
Router.get('/print-order', (req, res) => {
  res.render('printOrder');
});
Router.get('/product', (req, res) => {
  res.render('product');
});
Router.get('/edit-product', (req, res) => {
  res.render('editProduct');
});
Router.get('/edit-product/:id', (req, res) => {
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
Router.get('/campaign', (req, res) => {
  res.render('campaign');
});
Router.get('/edit-campaign', (req, res) => {
  res.render('editCampaign');
});
Router.get('/order', (req, res) => {
  res.render('order');
});
Router.get('/statistics-1', (req, res) => {
  res.render('statistics1');
});
Router.get('/statistics-2', (req, res) => {
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