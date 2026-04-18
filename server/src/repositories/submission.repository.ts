import prisma from "../config/prisma";
import { SubmissionStatus } from "@prisma/client";

type SubmissionData = {
  code: string;
  version: number;
  status: SubmissionStatus;
  score: number;
  scalabilityScore: number;
  consistencyScore: number;
  clarityScore: number;
  aiFeedback: string;
  userId: string;
  problemId: string;
};

export const create = async (data: any) => {
  return prisma.submission.create({ data: {
    code: data.code,
    language: data.language,
    status: "PENDING",
    userId: data.userId,
    problemId: data.problemId 
  }
});
};

export const getById = async (id: string) => {
  return prisma.submission.findUnique({ where: { id } });
};