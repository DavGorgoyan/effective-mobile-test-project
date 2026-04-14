import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ZodType } from 'zod';

const validateRequest = (schema: ZodType): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  };
};

export default validateRequest;
