import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import trashServer from "../trashServer";
import dotenv from "dotenv";
import {
  findRefreshToken,
  getListOfUsers,
  getUser,
} from "../controllers/userController";
import { generateAccessToken } from "../utils";
import { getProfilePictureURL } from "../tlgMiddleware";
import {
  ActionRequestBody,
  trashUser,
  TypedRequestBody,
  UserDataResponse,
} from "../interfaces";
dotenv.config();

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

  verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user:trashUser) => {
    if (err) return res.sendStatus(403);

    const newToken = generateAccessToken({ tlgID: user.tlgID, role:user.role });
    res.json({ accessToken: newToken });
  });
}

export async function userGetInfo(
  req: TypedRequestBody,
  res: Response
): Promise<void> {
  if (req.query.id) {
    const found = await getUser(parseInt(req.query.id.toString()));
    if (!found) {
      res.sendStatus(404);
      return;
    }
    const respJSON: UserDataResponse = {
      id: found.tlgID,
      exp: found.exp,
      role: found.role,
      name: found.name,
      createdAt: found.createdAt,
    };
    res.json(respJSON);
  } else {
    const found = await getUser(req.user.tlgID);
    if (!found) {
      res.sendStatus(404);
      return;
    }
    const respJSON: UserDataResponse = {
      id: found.tlgID,
      exp: found.exp,
      role: found.role,
      name: found.name,
      createdAt: found.createdAt,
    };
    res.json(respJSON);
  }
}

export async function userUpdateUserInfo(
  req: TypedRequestBody,
  res: Response
): Promise<void> {
  if (!req.body.tlgID) {
    res.sendStatus(418);
  }
  const found = await getUser(parseInt(req.body.tlgID));
  if (!found) {
    res.sendStatus(404);
  } else {
    found.update({
      name: req.body.name,
      exp: req.body.exp,
      role: req.body.role,
    });
    res.sendStatus(200);
  }
}

export async function userGetProfilePicture(
  req: TypedRequestBody,
  res: Response
): Promise<void> {
  const profilePicURL = await getProfilePictureURL(
    req.user.tlgID,
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

  res.json(found);
}

export async function userAction(
  req: ActionRequestBody,
  res: Response
): Promise<void> {
  const result = await trashServer.executeAction(req.body, req.user.role);
  if (result !== true) {
    res.sendStatus(500);
    return;
  }
  res.sendStatus(200);
}
