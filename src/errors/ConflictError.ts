import { StatusCodes } from "http-status-codes";
import { CustomError } from "./CustomError";

// Custom error class for handling conflict errors (409)
export class ConflictError extends CustomError {
  constructor(message: string) {
    super(message,StatusCodes.CONFLICT);
  }
}