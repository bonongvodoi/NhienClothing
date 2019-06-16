import * as express from "express";
let router = express.Router();
export = router;

router.use('/login', require('./login'));