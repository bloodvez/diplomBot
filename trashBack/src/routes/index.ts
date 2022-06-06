import { Router } from "express";
import userRouter from "./userRouter";
import loginRouter from "./loginRouter";

const router = Router();

router.use("/login", loginRouter);
router.use("/user", userRouter);

export default router;
