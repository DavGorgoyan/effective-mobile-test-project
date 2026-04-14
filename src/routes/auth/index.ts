import { Router } from "express";
import validateRequest from "../../middleware/validate-request.js";
import * as controller from "./controller.js";
import { loginSchema, registerSchema } from "./validators.js";

const authRouter: Router = Router();

authRouter.post(
  "/sign-up",
  validateRequest(registerSchema),
  controller.registerUser,
);
authRouter.post("/sign-in", validateRequest(loginSchema), controller.loginUser);

export default authRouter;
