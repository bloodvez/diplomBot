import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import trashServer from "../trashServer";
import dotenv from "dotenv";
import { findRefreshToken, getListOfUsers, getUser } from "../controllers/userController";
import { generateAccessToken } from "../utils";
import { getProfilePictureURL } from "../tlgMiddleware";
import { IUserRole } from "../models/models";
dotenv.config();

interface TypedRequestBody extends Request {
  user: {
    tlgID: string;
  };
}

interface UserDataResponse {
  id: number;
  exp: number;
  role: IUserRole;
  name: string;
  createdAt: string;
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

export async function userGetInfo(
  req: TypedRequestBody,
  res: Response
): Promise<void> {
  const found = await getUser(parseInt(req.user.tlgID));
  if (!found) res.sendStatus(404);
  const respJSON: UserDataResponse = { id: found.tlgID, exp: found.exp, role: found.role, name: found.name, createdAt: found.createdAt};
  res.json(respJSON);
}

export async function userGetProfilePicture(
  req: TypedRequestBody,
  res: Response
): Promise<void> {
  const profilePicURL = await getProfilePictureURL(
    parseInt(req.user.tlgID),
    trashServer.tlgBot.api
  );
  const fileURL = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${profilePicURL}`;
  const downloadPromise = await fetch(fileURL);
  const downloadBuffer = await downloadPromise.arrayBuffer();
  const buff = Buffer.from(downloadBuffer);
  res.type("jpg");
  res.send(buff);
}

export async function userListOfUsers(
  req: TypedRequestBody,
  res: Response
): Promise<void> {
  const found = await getListOfUsers();
  if (!found) res.sendStatus(404);

  res.json(found)
}

export function userAction(req: TypedRequestBody, res: Response): void {
  if (req.body.payload.text && req.body.payload.text !== "") {
    trashServer.botFunc(req.body.payload.text);
  } else {
    res.sendStatus(204);
  }
}