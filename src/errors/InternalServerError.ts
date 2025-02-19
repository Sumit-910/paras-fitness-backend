import { StatusCodes } from "http-status-codes";
import { CustomError } from "./CustomError";

// Class representing an Internal Server Error, extending CustomError status(500)
export class InternalServerError extends CustomError {
    constructor(message: string) {
      super(message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }