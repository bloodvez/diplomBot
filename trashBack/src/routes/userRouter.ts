import { Router } from "express";
import {
  authenticateToken,
  refreshToken,
  userAction,
  userGetProfilePicture,
  userGetInfo,
  userListOfUsers,
} from "./userMiddleware";

const userRouter = Router();

userRouter.get("/", authenticateToken, userGetInfo);
userRouter.get("/picture", authenticateToken, userGetProfilePicture);
userRouter.get("/users", authenticateToken, userListOfUsers);
userRouter.post("/action", authenticateToken, userAction);
userRouter.post("/refresh", refreshToken);

export default userRouter;
