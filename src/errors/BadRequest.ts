import { StatusCodes } from "http-status-codes";
import { CustomError } from "./CustomError";

// Custom error class for handling bad request errors (400)
export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message,StatusCodes.BAD_REQUEST);;
  }
}