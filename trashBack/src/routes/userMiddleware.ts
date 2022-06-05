import { NextFunction, Request, Response } from "express";
import { IUserToken } from "../interfaces";
import { sign, verify } from "jsonwebtoken";
import trashServer from "../trashServer";

const array1 = [
  {
    tlgID: 266536855,
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0bGdJRCI6IjI2NjUzNjg1NSIsImlhdCI6MTY1NDM1OTM3OX0.GYUZMMhHJUxk0hufBqBBpcNgZdE-bvBCxHsGN5PNJ7k",
  },
];

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
    // @ts-ignore
    req.user = user;
    next();
  });
}

export function userRegister(
  req: Request<{}, {}, IUserToken>,
  res: Response
): void {
  if (req.body.tlgID == null) res.sendStatus(204);

  let user = { tlgID: req.body.tlgID };
  const accessToken = generateAccessToken(user);
  const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET);
  array1[0].refreshToken = refreshToken;
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
}

export function refreshToken(req: Request, res: Response, next: NextFunction) {
  if (req.body.refreshToken == null) return res.sendStatus(204);

  const refreshToken = req.body.refreshToken;
  
  const found = array1.find((elem) => elem.refreshToken === refreshToken);

  if (!found) return res.sendStatus(403);

  verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newToken = generateAccessToken({ tlgID: parseInt(user.tlgID) });
    res.json({ accessToken: newToken });
  });
}

export function userTestFunc(
  req: TypedRequestBody,
  res: Response,
  next: NextFunction
): void {
  let foo = { text: `${Math.floor(Math.random() * 100)}` };
  const found = array1.find((elem) => elem.tlgID === parseInt(req.user.tlgID));
  if (found) res.json(foo);
  else res.sendStatus(403);
}

export function userAction(
  req: TypedRequestBody,
  res: Response,
  next: NextFunction
): void {
  if (req.body.payload.text && req.body.payload.text !== ''){
    trashServer.botFunc(req.body.payload.text)
  } else{
    res.sendStatus(204)
  }
}

function generateAccessToken(user: { tlgID: number }) {
  return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" });
}
