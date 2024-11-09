import { createSafeActionClient } from 'next-safe-action';

import { SERVER_ERROR_CODES } from './errors';
import { ServerError } from './server-error';

export const action = createSafeActionClient({
  handleServerError: (e) => {
    console.error(e.message);

    if (e instanceof ServerError) {
      return e.getErrorCode();
    }
    // Is unhandled error or not added to server errors
    return SERVER_ERROR_CODES.UNHANDLED_ERROR;
  },
});
