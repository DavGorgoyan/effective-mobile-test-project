import { UserRole } from "@prisma/client";
import type { Request, Response } from "express";
import { InvalidUserRouteParamException } from "../../exceptions/user.exception.js";
import userService from "../../services/user-service.js";
import type { ApiResponse } from "../../types/api-response.js";
import { sendSuccess } from "../../utils/api-response.js";
import { BlockUserData, GetUserData, ListUsersData } from "../../types/user.js";

const getRouteParam = (value: string | string[] | undefined): string => {
  if (!value || Array.isArray(value)) {
    throw new InvalidUserRouteParamException();
  }

  return value;
};

export const getUserById = async (
  req: Request,
  res: Response<ApiResponse<GetUserData>>,
): Promise<void> => {
  const actor = req.authUser!;
  const user = await userService.getUserById(
    actor,
    getRouteParam(req.params.id),
  );

  sendSuccess(res, 200, { user });
};

export const getUsers = async (
  req: Request,
  res: Response<ApiResponse<ListUsersData>>,
): Promise<void> => {
  const actor = req.authUser!;
  const users = await userService.listUsers(actor, {
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
    search: req.query.search ? String(req.query.search) : undefined,
    role: req.query.role ? (String(req.query.role) as UserRole) : undefined,
    isActive:
      typeof req.query.isActive === "string"
        ? req.query.isActive === "true"
        : undefined,
  });

  sendSuccess(res, 200, { users });
};

export const blockUser = async (
  req: Request,
  res: Response<ApiResponse<BlockUserData>>,
): Promise<void> => {
  const actor = req.authUser!;
  await userService.blockUser(actor, getRouteParam(req.params.id));

  sendSuccess(res, 200, { success: true });
};
