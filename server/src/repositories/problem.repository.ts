import { Difficulty } from "@prisma/client";
import { prisma } from "../config/db";

export const createProblem = async (data: {
  title: string;
  description: string;
  difficulty: Difficulty;
  constraints: string; 
}) => {
  return prisma.problem.create({
    data,
  });
};

export const getAllProblems = async () => {
  return prisma.problem.findMany();
};

export const getProblemById = async (id: string) => {
  return prisma.problem.findUnique({
    where: { id },
  });
};