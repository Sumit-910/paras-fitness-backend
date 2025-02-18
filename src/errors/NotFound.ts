
import { StatusCodes } from "http-status-codes";
import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  constructor(message:string) {
    super(message,StatusCodes.NOT_FOUND);
  }
}