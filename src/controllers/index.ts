import * as express from "express";

const router = express.Router();

router.use("/", require("./admin"));
router.use('/api', require('./api/index'));


export = router