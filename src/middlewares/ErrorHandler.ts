import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

// Middleware for handling errors
export const ErrorHandler:ErrorRequestHandler= (err, req: Request, res: Response, next: NextFunction) => {
  // Define a custom error object with default values
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  };

  // Send the response with the custom error message
  res.status(customError.statusCode).json({ msg: customError.msg });

  return;
};

