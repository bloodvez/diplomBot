import { Router } from "express";
import {
  authenticateToken,
  refreshToken,
  userAction,
  userTestFunc,
} from "./userMiddleware";

const router = Router();

router.get("/test", authenticateToken, userTestFunc);
router.post("/action", authenticateToken, userAction);
// router.post("/register", userRegister);
router.post("/refresh", refreshToken);

export default router;
