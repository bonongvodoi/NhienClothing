import { Product } from "../models/schemas/productSchema";
import { isAuthenticated } from "../lib/auth";
import { Order } from "../models/schemas/orderSchema";

const Router = require('express').Router();

const CACHE_EXPIRY = 3600;

Router.get('/', isAuthenticated, (req, res) => {
  res.render('index');
});
Router.get('/print-order', isAuthenticated, (req, res) => {
  res.render('printOrder');
});
Router.get('/print-order/:id', isAuthenticated, (req, res) => {
  let id = req.params.id;
  if (id) {
    res.render('printOrder', {layout: false, id});
  } else {
    res.render('printOrder', {layout: false});
  }
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
    res.render('editProduct', {id});
  } else {
    res.render('editProduct', {});
  }  
});
Router.get('/campaign', isAuthenticated, (req, res) => {
  res.render('campaign');
});
Router.get('/edit-campaign/:id', isAuthenticated, (req, res) => {
  let id = req.params.id;
  if (id) {
    res.render('editCampaign', {id});
  } else {
    res.render('editCampaign');
  }    
});
Router.get('/edit-campaign', isAuthenticated, (req, res) => {
  res.render('editCampaign');
});
Router.get('/order', isAuthenticated, (req, res) => {
  res.render('order');
});
Router.get('/recent-order', isAuthenticated, (req, res) => {
  res.render('recentOrder');
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