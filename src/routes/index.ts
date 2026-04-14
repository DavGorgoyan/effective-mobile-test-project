import { Router } from "express";
import authRouter from "./auth/index.js";
import healthRouter from "./health/index.js";
import usersRouter from "./users/index.js";

const rootRouter: Router = Router();

rootRouter.use("/health", healthRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/users", usersRouter);

export default rootRouter;
