import { getJWTFromToken } from "./getJWTFromToken";
import * as env from "./env";

describe("Token Generation", () => {
  it("should generate a token with given secret", () => {
    const token = getJWTFromToken({
      userId: "test",
      firstName: "test",
      lastName: "test",
      permissions: [],
    });

    expect(token).toBeTruthy();
  });

  it("should fail if no secret is defined", () => {
    // @ts-expect-error This is technically illegal, but we need it to mock for this test.
    env.secret = null;

    try {
      const token = getJWTFromToken({
        userId: "test",
        firstName: "test",
        lastName: "test",
        permissions: [],
      });
      fail("getJWTFromToken ran despite not having a provided secret.");
    } catch (e: any) {
      expect(e.message).toEqual(
        "SECRET not defined. Unable to generate token."
      );
    }
  });
});
