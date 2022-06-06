import { Router } from "express";
import {
  authenticateToken,
  refreshToken,
  userAction,
  userGetProfilePicture,
  userGetInfo,
  userListOfUsers,
  userUpdateUserInfo,
} from "./userMiddleware";

const userRouter = Router();

userRouter.get("/", authenticateToken, userGetInfo);
userRouter.get("/picture", authenticateToken, userGetProfilePicture);
userRouter.get("/getUser", authenticateToken, userGetInfo);
userRouter.post("/postUser", authenticateToken, userUpdateUserInfo);
userRouter.get("/getUsers", authenticateToken, userListOfUsers);
userRouter.post("/action", authenticateToken, userAction);
userRouter.post("/refresh", refreshToken);

export default userRouter;
