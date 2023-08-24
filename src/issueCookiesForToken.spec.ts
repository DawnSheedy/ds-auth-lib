import { issueCookiesForToken } from "./issueCookiesForToken";
import { AuthToken } from "./types/AuthToken";

describe("Issue Cookies for Token", () => {
  it("should set cookies", () => {
    const cookie = jest.fn();
    const jwt = issueCookiesForToken({} as AuthToken, { cookie } as any);
    expect(cookie).toHaveBeenCalledTimes(2);
    expect(cookie.mock.calls[0][0]).toEqual("TOKEN");
    expect(cookie.mock.calls[1][0]).toEqual("CSRF_TOKEN");
    expect(cookie.mock.calls[0][1]).toEqual(jwt);
    expect(cookie.mock.calls[1][1]).toEqual(jwt);
  });
});
