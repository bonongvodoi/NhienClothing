import * as express from "express";
import { Order } from "../../../models/schemas/orderSchema";

const router = express.Router();

router.post('/logout', function (req, res, next) {
  req.cookies.set('access_token', {expires: Date.now()});
  res.status(200).send({
    success: true
  })
});

export = router;