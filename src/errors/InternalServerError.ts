import { StatusCodes } from "http-status-codes";
import { CustomError } from "./CustomError";

export class InternalServerError extends CustomError {
    constructor(message: string) {
      super(message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }