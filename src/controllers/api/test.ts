import * as express from "express";
import { Test } from "../../models/schemas/testSchema";

const router = express.Router();

router.get('/', function (req, res, next) {
  res.status(200).send({
    message: 'GET request successfulll!!!!'
  })
});

router.get('/all', function (req, res, next) {

  Test.find({}).then((data) => {
    res.status(200).send({
      success: true,
      data
    })
  })
  .catch(next); 
});

router.get('/:id', function (req, res, next) {
  let id = req.params.id;

  if (!id) {
    next({
      message: 'Missing input id'
    })
    return;
  }

  let query = buildQuery(id);

  Test.findOne(query).then(_test => {
    let test = _test;
    res.status(200).send({
      success: true,
      data: test
    })
  })
});

router.post('/save', function (req, res, next) {
  let data = req.body.data;
  if (!data) {
    next({
      message: 'Missing input data'
    })
    return;
  }

  let test;  
  getByQuery(data).then(_test => {  
    test = _test;
    test.name = data.name;
    test.age = data.age;
    return test.save();
  })
  .then(_test => {
    
    test = _test;
    res.status(200).send({
      success: true,
      data: test
    })
  })
  .catch(next);
});

router.post('/delete/:id', function (req, res, next) {

  let id = req.params.id;

  if (!id) {
    next({
      message: 'Missing input id'
    })
    return;
  }

  let query: any = buildQuery(id);
  Test.findOneAndRemove(query)
  .then(() => {
    res.status(200).send({
      success: true
    })
  })
  .catch(next);  
});

function getByQuery(data) {
  const query: any = buildQuery(data.id);
  if (Object.keys(query).length > 0) {
    return Test.findOne(query);
  } else {
    return Promise.resolve(new Test());
  }
}

function buildQuery(id) {
  const query: any = {};
  if (id) {    
    if(isNaN(id)) {
      query['_id'] = id;
    } else {
      query['serialNum'] = id;
    }
  }
  return query;
}

export = router;