import { RequestHandler } from "express";
import { userHasPermissionMiddleware } from "./userHasPermissionMiddleware";

describe("User permission check middleware", () => {
  let middleware: RequestHandler;

  beforeAll(() => {
    middleware = userHasPermissionMiddleware(["TEST_PERM_1", "TEST_PERM_2"]);
  });

  it("should error if identity is not in context", () => {
    try {
      middleware({} as any, {} as any, () => {});
      fail();
    } catch (e: any) {
      expect(true).toBeTruthy();
    }
  });

  it("should succeed if user has all required permissions", () => {
    const next = jest.fn();

    middleware(
      {
        identity: {
          userId: "test",
          userName: "test",
          firstName: "test",
          lastName: "test",
          permissions: ["TEST_PERM_1", "TEST_PERM_2", 'EXTRA_PERM'],
        },
      } as any,
      {} as any,
      next
    );

    expect(next).toHaveBeenCalled();
  });

  it('should 401 if user lacks any required permissions', () => {
    const next = jest.fn();
    const res = { sendStatus: jest.fn() } as any;

    middleware(
        {
          identity: {
            userId: "test",
            userName: "test",
            firstName: "test",
            lastName: "test",
            permissions: ["TEST_PERM_1", "TEST_PERM_2_missing", 'EXTRA_PERM'],
          },
        } as any,
        res,
        next
      );

    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  })
});
