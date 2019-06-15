import * as express from "express";

const apiRouter = express.Router();

apiRouter.use('/test', require('./test'));
apiRouter.use('/product', require('./product'));
apiRouter.use('/campaign', require('./campaign'));

export = apiRouter