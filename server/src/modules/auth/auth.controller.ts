import { Request, Response } from "express";

import * as authService from "./auth.service";

import jwt from "jsonwebtoken";

import { prisma } from "../../config/db";

import {
    generateAccessToken,
    generateRefreshToken
} from "../../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await authService.signup(name, email, password);

  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const tokens = await authService.login(email, password);

  res.json(tokens);
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  // Check token
  if (!refreshToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as { userId: string };

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    console.log("DB token:", user?.refreshToken);
    console.log("Sent token:", refreshToken);

    // Match token
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Generate NEW tokens
    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    // Replace old token in DB
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    // Send new tokens
    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res.status(403).json({ message: "Token expired or invalid" });
  }
};