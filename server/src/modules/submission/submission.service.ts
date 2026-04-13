import * as submissionRepo from "../../repositories/submission.repository";
import { evaluationPipeline } from "../../pipelines/evaluation.pipeline";
import { SubmissionStatus } from "@prisma/client";
import { submissionQueue } from "../../queues/submission.queue";
import prisma from "../../config/prisma";

type SubmissionInput = {
  answer: string;
};

export const handleSubmission = async (data: SubmissionInput) => {
  const submission = await submissionRepo.create({
    answer: data.answer,
    status: SubmissionStatus.PENDING,
    userId: "temp-user",
    problemId: "temp-problem",
  });

  await submissionQueue.add("evaluate", {
    submissionId: submission.id,
    answer: data.answer
  });

  return submission;
};

export const getSubmissionById = async (id: string) => {
  return await prisma.submission.findUnique({
    where: { id },
  });
};
