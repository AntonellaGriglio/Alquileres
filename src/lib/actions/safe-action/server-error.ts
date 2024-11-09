import { SERVER_ERROR_CODES_VALUE } from "./errors"

export class ServerError extends Error {
  constructor(msg: SERVER_ERROR_CODES_VALUE) {
    super(msg)
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ServerError.prototype)
  }

  getErrorCode(): SERVER_ERROR_CODES_VALUE {
    return this.message as SERVER_ERROR_CODES_VALUE
  }
}
