import { RequestHandler } from "express";
import { getTokenFromJWT } from "./getTokenFromJWT";

/**
 * Verify if user is authenticated.
 * If not, 401.
 * If so, load identity into context and continue.
 * @param req
 * @param res
 * @param next
 */
export const userAuthenticatedMiddleware: RequestHandler = (req, res, next) => {
  if (!req.cookies?.authToken) {
    return res.sendStatus(401);
  }

  const identity = getTokenFromJWT(req.cookies.authToken);

  if (!identity) {
    return res.sendStatus(401);
  }

  req.identity = identity;

  next();
};
