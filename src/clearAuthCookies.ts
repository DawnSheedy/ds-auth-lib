import { Response } from "express";

/**
 * Given token and response, set cookies.
 * @param token
 * @param res
 */
export const clearAuthCookies = (res: Response) => {
  res.clearCookie("TOKEN");
  res.clearCookie("CSRF_TOKEN");
};
