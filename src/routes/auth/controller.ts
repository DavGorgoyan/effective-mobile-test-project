import type { Request, Response } from "express";
import authService from "../../services/auth-service.js";
import type { ApiResponse } from "../../types/api-response.js";
import { sendSuccess } from "../../utils/api-response.js";
import { LoginData, RegisterUserData } from "../../types/auth.js";

export const registerUser = async (
  req: Request,
  res: Response<ApiResponse<RegisterUserData>>,
): Promise<void> => {
  const user = await authService.register({
    fullName: req.body.fullName,
    dateOfBirth: new Date(req.body.dateOfBirth),
    email: req.body.email,
    password: req.body.password,
  });

  sendSuccess(res, 201, {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    },
  });
};

export const loginUser = async (
  req: Request,
  res: Response<ApiResponse<LoginData>>,
): Promise<void> => {
  const result = await authService.login({
    email: req.body.email,
    password: req.body.password,
  });

  sendSuccess(res, 200, result);
};
