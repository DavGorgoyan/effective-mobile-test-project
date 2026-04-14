import { Router } from 'express';
import { getHealth } from './controller.js';

const healthRouter: Router = Router();

healthRouter.get('/', getHealth);

export default healthRouter;
