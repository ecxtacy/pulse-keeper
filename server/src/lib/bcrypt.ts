import bcrypt from "bcrypt";

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

export const hashPassword = async (password: string) => {
  const hashedString = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedString;
};

export const verifyPassword = async (
  inputPassword: string,
  hashedPassword: string,
) => {
  const result = await bcrypt.compare(inputPassword, hashedPassword);
  return result;
};
