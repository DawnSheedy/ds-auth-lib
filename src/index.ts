import { AuthToken } from "./types/AuthToken";
import { getJWTFromToken } from "./getJWTFromToken";
import { getTokenFromJWT } from "./getTokenFromJWT";
import { userAuthenticatedMiddleware } from "./userAuthenticatedMiddleware";
import { userHasPermissionMiddleware } from "./userHasPermissionMiddleware";
import { clearAuthCookies } from "./clearAuthCookies";
import { issueCookiesForToken } from "./issueCookiesForToken";

export {
  AuthToken as UserIdentity,
  getJWTFromToken,
  getTokenFromJWT,
  userAuthenticatedMiddleware,
  userHasPermissionMiddleware,
  clearAuthCookies,
  issueCookiesForToken,
};
