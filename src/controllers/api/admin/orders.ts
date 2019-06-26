import * as express from "express";
import { Order } from "../../../models/schemas/orderSchema";

const router = express.Router();

router.get('/all', function (req, res, next) {
  Order.find({}).then(orders => {
    res.status(200).send({
      success: true,
      data: orders
    })
  })
});

router.get('/recent', function (req, res, next) {

  var start = new Date();
  start.setHours(0, 0, 0, 0);

  var end = new Date();
  end.setHours(23, 59, 59, 999);

  Order.find({'createdAt': {$gte: start, $lt: end}}).sort({ 'createdAt': -1 }).limit(10).then(orders => {
    res.status(200).send({
      success: true,
      data: orders
    });
  })
});

router.post('/save-order', function (req, res, next) {
  let data = req.body.data;
  if (!data) {
    next({
      message: 'Missing input'
    })
    return;
  }

  if (!validateOrder(data, next)) return;

  let order = new Order();

  order.orderDate = data.orderDate;
  order.orderHour = data.orderHour;
  order.orderDetail = data.orderDetail;
  order.grandPrice = data.grandPrice;
  if (data.discountPrice) {
    order.discountPrice = data.discountPrice;
  }
  order.total = data.total;
  order.byWho = data.byWho;
  order.note = data.note;

  order.save().then(o => {
    res.status(200).send({
      success: true,
      data: o
    })
  })
    .catch(next);
});

router.get('/get-order/:id', function (req, res, next) {
  let id = req.params.id;

  if (!id) {
    next({
      message: 'Missing input id'
    })
    return;
  }

  getByQuery({ id }, false).then(order => {
    if (!order)
      next({
        message: 'Missing order'
      })
    res.status(200).send({
      success: true,
      data: order
    })
  })
})

function validateOrder(data, next) {
  return true;
}

function getByQuery(data, createNew = true) {
  const query: any = buildQuery(data.id);
  if (Object.keys(query).length > 0) {
    return Order.findOne(query);
  } else {
    return Promise.resolve(createNew ? (new Order()) : null);
  }
}

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

export = router;