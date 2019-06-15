import * as express from "express";
import { Campaign } from "../../models/schemas/campaignSchema";
import { Product } from "../../models/schemas/productSchema";

const router = express.Router();

router.post('/save-campaign', function (req, res, next) {
  let data = req.body.data;

  if (!validateCampaign(data, next)) return;

  let startDate = new Date(data.start_date);
  let endDate = new Date(data.end_date);

  let campaign;
  getByQuery(data).then((_campaign = new Campaign()) => {
    campaign = _campaign;
    campaign.name = data.name;
    campaign.description = data.description;
    campaign.type = data.type;
    switch (data.type) {
      case 'discount_by_percent':
        let disValue = data.discount_value > 100 ? 1 : data.discount_value < 1 ? 0.01 : round(data.discount_value / 100);
        campaign.discount_value = disValue;
        break;
      case 'discount_by_value':
      case 'same_price':
        campaign.discount_value = data.discount_value;
        break;
      default:
        disValue = data.discount_value > 100 ? 1 : data.discount_value < 1 ? 0.01 : round(data.discount_value / 100);
        campaign.discount_value = disValue;
        break;
    }
    // campaign.start_date = startDate;
    // campaign.end_date = endDate;
    campaign.status = 'active';
    return campaign.save();
  })
    .then(_campaign => {
      campaign = _campaign;
      return Product.find({ campaign: campaign._id }).then(async products => {
        await updateProduct(products, campaign);
      })
    })
    .then(() => {
      res.status(200).send({
        success: true,
        data: campaign
      })
    })
    .catch(next);
});

router.get('/all', function (req, res, next) {
  Campaign.find({}).then(campaigns => {
    res.status(200).send({
      success: true,
      data: campaigns
    })
  })
    .catch(next);
})

router.post('/change-status/:id', function (req, res, next) {
  let id = req.params.id;
  let status = req.body.status;

  if (!id) {
    next({
      message: 'Missing input id'
    })
    return;
  }
  let campaign;
  getByQuery({ id }, false).then((_campaign) => {
    if (!_campaign)
      next({
        message: 'Cant find campaign'
      })
    campaign = _campaign;
    campaign.status = status || 'inactive';
    return campaign.save();
  })
    .then(_campaign => {
      campaign = _campaign;
      return Product.find({ campaign: campaign._id }).then(async products => {
        await updateProduct(products, campaign);
      })
    })
    .then(() => {
      res.status(200).send({
        success: true,
        data: campaign
      })
    })
    .catch(next)
})

router.post('/add-to-campaign/:id', function (req, res, next) {
  let id = req.params.id;
  if (!id) {
    next({
      message: 'Missing input id'
    })
    return;
  }
  let productId = req.body.productId;
  let category = req.body.category;
  let isAll = !!req.body.addAll;

  let campaign;
  getByQuery({ id }, false).then((_campaign) => {
    if (!_campaign)
      next({
        message: 'Cant find campaign'
      })
    campaign = _campaign;
    if (campaign.status != 'active') return Promise.resolve(null);
    let query = buildProductQuery(productId, category, isAll);
    if (query != null) {
      return Product.find(query).then(async producs => {
        await updateProduct(producs, campaign);
      })
    }
    return Promise.resolve(null);
  })
    .then(() => {
      res.status(200).send({
        success: true,
        data: campaign
      })
    })
    .catch(next)

})

router.get('/get/:id', function (req, res, next) {
  let id = req.params.id;

  if (!id) {
    next({
      message: 'Missing input id'
    })
    return;
  }
  let campaign;
  getByQuery({ id }, false).then((_campaign) => {
    if (!_campaign)
      next({
        message: 'Cant find campaign'
      })
    campaign = _campaign;
    res.status(200).send({
      success: true,
      data: campaign
    })
  })
})

function getByQuery(data, createNew = true) {
  const query: any = buildQuery(data.id);
  if (Object.keys(query).length > 0) {
    return Campaign.findOne(query);
  } else {
    return Promise.resolve(createNew ? (new Campaign()) : null);
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

function buildProductQuery(id, category, isAll = false) {
  const query: any = {};
  if (isAll) {
    return query;
  }
  if (category) {
    query['category'] = category;
    return query;
  }
  if (id) {
    if (isNaN(id)) {
      query['_id'] = id;
    } else {
      query['serialNum'] = id;
    }
    return query;
  }
  return null;
}

function validateCampaign(campaign, next) {
  if (!campaign) {
    next({
      message: 'Missing campaign'
    })
    return false;
  }

  if (!campaign.name) {
    next({
      message: 'Missing campaign name'
    })
    return false;
  }
  if (!campaign.discount_value) {
    next({
      message: 'Missing campaign discount value'
    })
    return false;
  }
  // if (!campaign.start_date || !isValidDate(campaign.start_date)) {
  //   next({
  //     message: 'Missing campaign start date'
  //   })
  //   return false;
  // }
  // if (!campaign.end_date || !isValidDate(campaign.end_date)) {
  //   next({
  //     message: 'Missing campaign end date'
  //   })
  //   return false;
  // }
  return true;
}

async function updateProduct(producs, campaign) {
  if (!producs || producs.length == 0) return Promise.resolve(null);
  for (let i = 0; i < producs.length; i++) {
    const p = producs[i];
    p.campaign = campaign._id;
    p.calDiscountPrice(campaign);
    await p.save()
  }
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d as any);
}

function round(num) {
  return Math.round((num + 0.00001) * 100) / 100;
}

export = router;