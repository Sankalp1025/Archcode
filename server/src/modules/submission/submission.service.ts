import * as submissionRepo from "../../repositories/submission.repository";
import { evaluationPipeline } from "../../pipelines/evaluation.pipeline";
import { SubmissionStatus } from "@prisma/client";
import { submissionQueue } from "../../queues/submission.queue";
import prisma from "../../config/prisma";

type SubmissionInput = {
  code: string;
  language: string;
  userId: string;
  problemId: string;
};

export const handleSubmission = async (data: SubmissionInput) => {
  const submission = await submissionRepo.create({
    code: data.code,
    language: data.language,
    status: SubmissionStatus.PENDING,
    userId: data.userId,
    problemId: data.problemId,
  });

  await submissionQueue.add("submission", {
    submissionId: submission.id
  });

  return submission;
};

export const getSubmissionById = async (id: string) => {
  return await prisma.submission.findUnique({
    where: { id },
  });
};
