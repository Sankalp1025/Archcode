import { prisma } from "../../config/db";
import { hashPassword, comparePassword } from "../../utils/hash";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt";

export const signup = async (name: string, email: string, password: string) => {
  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  return user;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("User not found");

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
    });

  return { accessToken, refreshToken };
};