import { Router } from "express";
import {
  authenticateToken,
  refreshToken,
  userAction,
  userGetProfilePicture,
  userGetInfo,
} from "./userMiddleware";

const userRouter = Router();

userRouter.get("/", authenticateToken, userGetInfo);
userRouter.get("/picture", authenticateToken, userGetProfilePicture);
userRouter.post("/action", authenticateToken, userAction);
userRouter.post("/refresh", refreshToken);

export default userRouter;
