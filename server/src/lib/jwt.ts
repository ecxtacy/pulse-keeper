import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtData } from "../types/jwt";

// TODO: Move these into a common separate config.ts file
const JWT_SECRET_KEY = "temporary_jwt_secret";
const JWT_EXPIRATION_IN_SECONDS = 60 * 60;

export const decodeUsername = (token: string) => {
  return (jwt.decode(token) as JwtPayload).username;
}; 

export const generateJWT = (data: jwtData) => {
  const token = jwt.sign(data, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRATION_IN_SECONDS,
  });
  return token;
};

export const verifyJWT = (token: string) => {
  const result = jwt.verify(token, JWT_SECRET_KEY);
  return result as JwtPayload;
};
