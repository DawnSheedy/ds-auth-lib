import { AuthToken } from "./AuthToken";

export {};

declare global {
  namespace Express {
    export interface Request {
      identity?: AuthToken;
    }
  }
}