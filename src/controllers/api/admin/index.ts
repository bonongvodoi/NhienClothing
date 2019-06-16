import * as express from "express";
let router = express.Router();
export = router;

router.use(require('../../../lib/auth').authenticateUser);
router.use('/product', require('./product'));
router.use('/campaign', require('./campaign'));
router.use('/user', require('./users'));