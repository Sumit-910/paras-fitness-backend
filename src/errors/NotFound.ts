
import { StatusCodes } from "http-status-codes";
import { CustomError } from "./CustomError";

// Class representing a Not Found Error, extending CustomError status(404)
export class NotFoundError extends CustomError {
  constructor(message:string) {
    super(message,StatusCodes.NOT_FOUND);
  }
}