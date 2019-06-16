import * as express from "express";

const router = express.Router();

router.post('/logout', function (req, res, next) {
  global['currentUser'] = null;
  res.status(200).send({
    success: true
  })
});

export = router;