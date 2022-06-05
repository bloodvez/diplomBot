import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import trashServer from "../trashServer";
import dotenv from "dotenv";
import { findRefreshToken, getUser } from "../controllers/userController";
import { generateAccessToken } from "../utils";
dotenv.config();

interface TypedRequestBody extends Request {
  user: {
    tlgID: string;
  };
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);

    // @ts-ignore
    req.user = user;
    next();
  });
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body.refreshToken == null) return res.sendStatus(204);
  const refreshToken = req.body.refreshToken;

  const found = await findRefreshToken(refreshToken);
  if (!found) return res.sendStatus(403);

  verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newToken = generateAccessToken({ tlgID: parseInt(user.tlgID) });
    res.json({ accessToken: newToken });
  });
}

export async function userTestFunc(
  req: TypedRequestBody,
  res: Response,
  next: NextFunction
): Promise<void> {
  // let foo = { text: `${Math.floor(Math.random() * 100)}` };
  const found = await getUser(parseInt(req.user.tlgID));
  if (!found) res.sendStatus(403);
  res.json({id: found.tlgID, exp: found.exp});
}

export function userAction(
  req: TypedRequestBody,
  res: Response,
  next: NextFunction
): void {
  if (req.body.payload.text && req.body.payload.text !== "") {
    trashServer.botFunc(req.body.payload.text);
  } else {
    res.sendStatus(204);
  }
}

// export function userRegister(
//   req: Request<{}, {}, IUserToken>,
//   res: Response
// ): void {
//   if (req.body.tlgID == null) res.sendStatus(204);

//   let user = { tlgID: req.body.tlgID };
//   const accessToken = generateAccessToken(user);
//   const refreshToken = generateRefreshToken(user);
//   // array1[0].refreshToken = refreshToken;
//   res.json({ accessToken: accessToken, refreshToken: refreshToken });
// }
