import { StatusCodes } from "http-status-codes";
import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError {
  constructor(message:string) {
    super(message,StatusCodes.UNAUTHORIZED);
  }
}
