import { clearAuthCookies } from "./clearAuthCookies";

describe("Clear Auth Cookies", () => {
  it("should clear correct cookies", () => {
    const clearCookie = jest.fn();
    clearAuthCookies({ clearCookie } as any);

    expect(clearCookie.mock.calls[0][0]).toEqual("TOKEN");
    expect(clearCookie.mock.calls[1][0]).toEqual("CSRF_TOKEN");
  });
});
