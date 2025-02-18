import { StatusCodes } from "http-status-codes";
import { CustomError } from "./CustomError";

export class ConflictError extends CustomError {
  constructor(message: string) {
    super(message,StatusCodes.CONFLICT);
  }
}