import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@/exceptions/httpException';
import { logger } from '@utils/logger';
import { ValidationError } from 'sequelize';

export const ErrorMiddleware = (error: HttpException | ValidationError, req: Request, res: Response, next: NextFunction) => {
  try {
    let status = 500;
    let message = 'Something went wrong';

    if (error instanceof HttpException) {
      status = error.status;
      message = error.message;
    }

    // Check if it's a Sequelize ValidationError and extract the messages
    if (error instanceof ValidationError) {
      status = 400; // Bad request
      message = error.errors.map(err => err.message).join(', '); // Collect error messages
    }

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};
