import { Response } from "express";
import { AuthToken } from "./types/AuthToken";
import { getJWTFromToken } from "./getJWTFromToken";

/**
 * Given token and response, set cookies.
 * @param token 
 * @param res 
 */
export const issueCookiesForToken = (token: AuthToken, res: Response) => {
    const jwt = getJWTFromToken(token);
    res.cookie('TOKEN', jwt);
    res.cookie('CSRF_TOKEN', jwt);
    return jwt;
}