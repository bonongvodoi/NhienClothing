import * as express from "express";

const apiRouter = express.Router();

apiRouter.use('/test', require('./test'));
apiRouter.use('/auth', require('./auth/index'));

// Auth apis
apiRouter.use(require('../../lib/auth').authenticateUser);
apiRouter.use('/product', require('./admin/product'));
apiRouter.use('/campaign', require('./admin/campaign'));
apiRouter.use('/user', require('./admin/users'));
apiRouter.use('/order', require('./admin/orders'));


export = apiRouter