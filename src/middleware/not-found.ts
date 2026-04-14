import type { Request, Response } from 'express';
import { RouteNotFoundException } from '../exceptions/app.exception.js';
import { sendError } from '../utils/api-response.js';

const notFound = (req: Request, res: Response): void => {
  const routeNotFound = new RouteNotFoundException(`${req.method} ${req.originalUrl}`);

  sendError(res, routeNotFound.statusCode, {
    code: routeNotFound.code,
    message: routeNotFound.message,
  });
};

export default notFound;
