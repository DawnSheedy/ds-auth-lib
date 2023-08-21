import { sign } from "jsonwebtoken";
import { AuthToken } from "./types/AuthToken";
import { expiresIn, secret } from "./env";

/**
 * Given an auth token, sign it.
 * Does not work in browser.
 * @param token
 * @returns
 */
export const getJWTFromToken = (token: AuthToken) => {
  if (secret === null) {
    throw new Error("SECRET not defined. Unable to generate token.");
  }

  return sign(token, secret, { expiresIn });
};
