import { Router } from 'express';
import healthRouter from './health/index.js';

const rootRouter: Router = Router();

rootRouter.use('/health', healthRouter);

export default rootRouter;
