import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
dotenv.config();

export function generateAccessToken(user: { tlgID: number }) {
  return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });
}

export function generateRefreshToken(user: { tlgID: number }) {
  return sign(user, process.env.REFRESH_TOKEN_SECRET);
}
