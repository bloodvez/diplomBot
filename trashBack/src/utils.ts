import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { trashUser } from "./interfaces";
dotenv.config();

export function generateAccessToken(user:trashUser) {
  return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
}

export function generateRefreshToken(user:trashUser) {
  return sign(user, process.env.REFRESH_TOKEN_SECRET);
}
