import prisma from "../config/prisma";
import { SubmissionStatus } from "@prisma/client";

type SubmissionData = {
  answer: string;
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

export const create = async (data: SubmissionData) => {
  return prisma.submission.create({ data });
};