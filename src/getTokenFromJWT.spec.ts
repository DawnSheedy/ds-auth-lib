import { getTokenFromJWT } from "./getTokenFromJWT";
import * as env from "./env";
import { getJWTFromToken } from "./getJWTFromToken";
import { AuthToken } from "./types/AuthToken";

const errorMessage = "SECRET not defined. Unable to securely validate token.";

describe("Token Decoding", () => {
  it("should fail if token is invalid", () => {
    const result = getTokenFromJWT("invalid!");
    expect(result).toEqual(null);
  });

  it("should return JWT contents", () => {
    const token = getJWTFromToken({ userId: "test" } as AuthToken);
    const decoded = getTokenFromJWT(token);

    expect(decoded?.userId).toEqual("test");
  });

  it("should error if no secret defined and secure enabled", () => {
    // @ts-expect-error Needed for mocking
    env.secret = null;

    try {
      const token = getTokenFromJWT("test");
      fail("getTokenFromJWT ran despite not having a provided secret.");
    } catch (e: any) {
      expect(e.message).toEqual(errorMessage);
    }
  });

  it("should pass without error if secure disabled and no secret provided", () => {
    // @ts-expect-error Needed for mocking
    env.secret = null;

    const result = getTokenFromJWT("invalid!", false);
    expect(result).toEqual(null);
  });
});
