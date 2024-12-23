enum UNHANDLED_SERVER_ERROR {
  UNHANDLED_ERROR = "UNHANDLED_ERROR",
}

// Here goes all server error codes
export const SERVER_ERROR_CODES = {
  ...UNHANDLED_SERVER_ERROR,
}

type SERVER_ERROR_CODES_KEY = keyof typeof SERVER_ERROR_CODES

export type SERVER_ERROR_CODES_VALUE =
  (typeof SERVER_ERROR_CODES)[SERVER_ERROR_CODES_KEY]

export const SERVER_ERROR_CODES_SET = new Set(Object.values(SERVER_ERROR_CODES))
