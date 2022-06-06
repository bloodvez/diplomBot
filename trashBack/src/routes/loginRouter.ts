import { Router } from "express";
import { login } from "./loginMiddleware";

const loginRouter = Router();

loginRouter.get("/", login);

export default loginRouter;
