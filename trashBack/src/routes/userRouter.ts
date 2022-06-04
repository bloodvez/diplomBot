import { Router } from "express";
import { authenticateToken, refreshToken, userRegister, userTestFunc } from "./userMiddleware";

const router = Router();

router.get("/test", authenticateToken, userTestFunc);
router.post("/register", userRegister);
router.post("/refresh", refreshToken);

export default router;
