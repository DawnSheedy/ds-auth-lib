import { RequestHandler } from "express";

/**
 * Generate middleware
 * @param permissions permissions to verify
 */
export const userHasPermissionMiddleware = (
  permissions: string[]
): RequestHandler => {
  return (req, res, next) => {
    if (!req.identity) {
      throw new Error(
        "Unable to retrieve user identity while trying to check permissions.\nWas the userAuthenticatedMiddleware ran first?"
      );
    }

    // Check each permission
    for (let permission of permissions) {
      if (!req.identity.permissions.includes(permission)) {
        return res.sendStatus(403);
      }
    }

    next();
  };
};
