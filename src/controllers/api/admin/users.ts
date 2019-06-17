import * as express from "express";
import { Order } from "../../../models/schemas/orderSchema";

const router = express.Router();

router.post('/logout', function (req, res, next) {
  global['currentUser'] = null;
  res.status(200).send({
    success: true
  })
});

export = router;