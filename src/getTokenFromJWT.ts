import { verify, decode } from "jsonwebtoken";
import { AuthToken } from "./types/AuthToken";
import { secret } from "./env";

/**
 * Given a JWT, return the decoded token.
 * @param token
 * @param secure
 * @returns
 */
export const getTokenFromJWT = (token: string, secure = true) => {
  if (secret === null && secure) {
    throw new Error("SECRET not defined. Unable to securely validate token.");
  }

  try {
    const payload = (secure
      ? verify(token, secret!) // Non-null assertion is safe, above if statement will catch
      : decode(token)) as unknown as AuthToken;
    return payload;
  } catch {
    return null;
  }
};
