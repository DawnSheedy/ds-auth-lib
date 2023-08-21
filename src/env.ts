// Pull secret if we're running in node, otherwise null.
const secret = process?.env?.SECRET ?? null;
const expiresIn = process?.env?.TOKEN_LENGTH
  ? process?.env?.TOKEN_LENGTH + "s"
  : "1d";

export { secret, expiresIn };
