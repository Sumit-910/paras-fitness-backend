import { StatusCodes } from "http-status-codes";
import { CustomError } from "./CustomError";

// Class representing an Unauthorized Error, extending CustomError status(401)
export class UnauthorizedError extends CustomError {
  constructor(message:string) {
    super(message,StatusCodes.UNAUTHORIZED);
  }
}
