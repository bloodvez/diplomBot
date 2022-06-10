import { Request, Response } from "express";
import { findRefreshToken } from "../controllers/userController";
import { generateAccessToken } from "../utils";

export async function login(req: Request, res: Response): Promise<void> {
  if (!req.query.tk) {
    res.sendStatus(204);
    return;
  }
  const foundToken = await findRefreshToken(req.query.tk.toString());
  if(!foundToken) {
    res.sendStatus(403);
    return;
  }
  const newToken = generateAccessToken({ tlgID: foundToken.tlgID, role: "USER"});
  res.json({ accessToken: newToken });
}
