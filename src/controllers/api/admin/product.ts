import * as express from "express";
import { Product } from "../../../models/schemas/productSchema";
import { Tag } from "../../../models/schemas/tagSchema";
import { Category } from "../../../models/schemas/categorySchema";
import { ProductFilterModel } from "../../../models/productFilterModel";
import { ProductPagingModel } from "../../../models/productPagingModel";

const router = express.Router();

router.post('/search', function (req, res, next) {
  let productFilter = req.body.filter;
  let filterModel = new ProductFilterModel(productFilter);
  let filterQuery = buildFilterQuery(filterModel);
  let pagingQuery = buildPagingQuery(filterModel);
  (Product as any).paginate(filterQuery, pagingQuery).then(result => {
    let productPaging = new ProductPagingModel();
    productPaging.page = filterModel.page;
    productPaging.limit = result.limit;
    productPaging.total = result.total;
    productPaging.products = result.docs;
    res.status(200).send({
      success: true,
      data: productPaging
    })
  })
    .catch(next);
})

router.post('/save-product', function (req, res, next) {
  let data = req.body.data;

  if (!validateProduct(data, next)) return;

  let product;
  let queryPromise = [getByQuery(data), getAndsaveCategory(data.category)]
  Promise.all(queryPromise).then(results => {

    product = results[0] || new Product();
    product.name = data.name;
    product.description = data.description;
    product.size = data.size;
    product.category = results[1];
    if (data.tag && data.tag.length > 0)
      product.tag = data.tag.map(t => t.toLowerCase());
    product.price = data.price;
    product.discounted_price = 0;
    saveTag(product.tag);
    if (product.campaign) {
      product.calDiscountPrice(product.campaign)
    }
    return product.save();
  })
    .then(_product => {
      product = _product;
      res.status(200).send({
        success: true,
        data: product
      })
    })
    .catch(next);
});

router.get('/get-many', function (req, res, next) {
  let category = req.query.category;
  let tag = req.query.tag;

  if (!category && !tag) {
    next({
      message: 'Missing input category and tag'
    })
    return;
  }

  // Build get many query
  let query = {};
  if (category) {
    query['category'] = category
  }
  if (tag) {
    query['tag'] = { $elemMatch: { $eq: tag } }
  }

  Product.find(query).populate("campaign").then(_products => {
    let products = _products;
    res.status(200).send({
      success: true,
      data: products
    })
  })
});

router.get('/get-categories', function (req, res, next) {
  let search = req.query.search;
  Category.find(search ? { $text: { $search: search } } : {}).then(categories => {
    res.status(200).send({
      success: true,
      data: categories
    })
  })
})

router.get('/get-tags', function (req, res, next) {
  let search = req.query.search;
  Tag.find(search ? { $text: { $search: search } } : {}).then(tags => {
    res.status(200).send({
      success: true,
      data: tags
    })
  })
})

router.get('/get/:id', function (req, res, next) {
  let id = req.params.id;

  if (!id) {
    next({
      message: 'Missing input id'
    })
    return;
  }

  let query = buildQuery(id);

  Product.findOne(query).then(_product => {
    let product = _product;
    res.status(200).send({
      success: true,
      data: product
    })
  })
    .catch(next);
});

router.get('/all', function (req, res, next) {
  Product.find({ display: true }).populate("campaign").then(products => {
    res.status(200).send({
      success: true,
      data: products
    })
  })
    .catch(next);
})

function validateProduct(product, next) {
  if (!product) {
    next({
      message: 'campaign'
    })
    return false;
  }

  if (!product.name) {
    next({
      message: 'Missing product name'
    })
    return false;
  }
  if (!product.category) {
    next({
      message: 'Missing product category'
    })
    return false;
  }
  if (!product.size) {
    next({
      message: 'Missing product size'
    })
    return false;
  }
  if (!product.price) {
    next({
      message: 'Missing product price'
    })
    return false;
  }
  return true;
}

async function saveTag(tags) {
  if (tags && tags.length > 0) {
    for (let id = 0; id < tags.length; id++) {
      const tag = tags[id];
      let existTag = await Tag.findOne({ name: new RegExp(`^${tag}$`, 'i') }).exec();
      if (!existTag) {
        let newTag = new Tag();
        newTag.name = tag.toLowerCase();
        newTag.save();
      }
    }
  }
}

async function getAndsaveCategory(category) {
  if (category) {
    let existCategory = await Category.findOne({ name: new RegExp(`^${category}$`, 'i') }).exec();
    if (!existCategory) {
      let newCategory = new Category();
      newCategory.name = category;
      newCategory.save();
      return category;
    } else {
      return existCategory.name;
    }
  }
  return '';
}

function getByQuery(data) {
  const query: any = buildQuery(data.id);
  if (Object.keys(query).length > 0) {
    return Product.findOne(query).populate("campaign");
  } else {
    return Promise.resolve(new Product());
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

function buildFilterQuery(filter: ProductFilterModel) {
  let search = filter.searchTerm;
  let query: any = {};
  if (search) {
    if (isNaN(search as any)) {
      query = { $text: { $search: search } };
    } else {
      query = { '$where': `function() { return this.serialNum.toString().match(/${search}/) != null; }` };
    }
  }
  query['display'] = true;
  return query;
}

function buildPagingQuery(filter: ProductFilterModel) {
  let sortQuery = buildSortQuery(filter);
  return {
    page: filter.page,
    limit: filter.limit,
    sort: sortQuery,
  }
}

function buildSortQuery(filter: ProductFilterModel) {
  let search = filter.searchTerm;
  let query: any = {};
  if (search) {
    if (isNaN(search as any)) {
      //query['score'] = { $meta : 'textScore' }      
    } else {
      query['updatedAt'] = -1;
    }
  }
  return query;
}

export = router;