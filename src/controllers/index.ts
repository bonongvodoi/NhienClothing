import * as express from "express";

const router = express.Router();

router.use('/api', require('./api/index'));
router.use("/page", require("./page"));
router.use("/", require("./admin"));

export = router