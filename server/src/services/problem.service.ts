import { Difficulty } from "@prisma/client";
import * as problemRepo from "../repositories/problem.repository";

export const createProblemService = async (data: {
  title: string;
  description: string;
  difficulty: Difficulty;
  constraints: string;
}) => {
  return problemRepo.createProblem(data);
};

export const getAllProblemsService = async () => {
  return problemRepo.getAllProblems();
};

export const getProblemByIdService = async (id: string) => {
  return problemRepo.getProblemById(id);
};