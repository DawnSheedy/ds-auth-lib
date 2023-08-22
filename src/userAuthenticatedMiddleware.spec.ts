import { getJWTFromToken } from "./getJWTFromToken";
import { userAuthenticatedMiddleware } from "./userAuthenticatedMiddleware";

describe("User authentication middleware", () => {
  let jwt: string = "";
  beforeEach(() => {
    jwt = getJWTFromToken({
      userId: "test",
      userName: "test",
      firstName: "test",
      lastName: "test",
      permissions: [],
    });
  });

  it("should continue if the user is authenticated", () => {
    const next = jest.fn();

    userAuthenticatedMiddleware(
      { cookies: { authToken: jwt } } as any,
      {} as any,
      next
    );

    expect(next).toHaveBeenCalled();
  });

  it("should 401 if token is not provided", () => {
    const next = jest.fn();
    const res = { sendStatus: jest.fn() } as any;

    userAuthenticatedMiddleware({} as any, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should 401 if token is invalid", () => {
    const next = jest.fn();
    const res = { sendStatus: jest.fn() } as any;

    userAuthenticatedMiddleware(
      { cookies: { authToken: "invalid !" } } as any,
      res,
      next
    );

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});
