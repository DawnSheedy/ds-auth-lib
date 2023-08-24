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
    !req.cookies?.TOKEN &&
    !req.headers?.authorization &&
    !req.headers?.authorization?.startsWith("Bearer ")
  ) {
    return res.sendStatus(401);
  }

  const isCookieAuth = !!req.cookies?.TOKEN;

  const jwt = req.cookies?.TOKEN ?? req.headers?.authorization?.slice(7);

  // Check to make sure X-CSRF-TOKEN matches auth cookie
  if (isCookieAuth && jwt !== req.headers["X-CSRF-Token"]) {
    res.sendStatus(401);
  }

  const identity = getTokenFromJWT(jwt);

  if (!identity) {
    return res.sendStatus(401);
  }

  req.identity = identity;

  next();
};
