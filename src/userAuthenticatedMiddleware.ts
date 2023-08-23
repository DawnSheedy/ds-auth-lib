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
  if (
    !req.cookies?.authToken &&
    !req.headers?.authorization &&
    !req.headers?.authorization?.startsWith("Bearer ")
  ) {
    return res.sendStatus(401);
  }

  const jwt = req.cookies?.authToken ?? req.headers?.authorization?.slice(7);

  const identity = getTokenFromJWT(jwt);

  if (!identity) {
    return res.sendStatus(401);
  }

  req.identity = identity;

  next();
};
