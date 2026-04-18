import { Worker } from "bullmq";
import { redisConnection } from "../config/redis";
import { prisma } from "../config/db";
import { evaluationPipeline } from "../pipelines/evaluation.pipeline";
import { SubmissionStatus } from "@prisma/client";

export const designWorker = new Worker(
  "submission-queue",
  async (job) => {
    const { submissionId } = job.data;

    try {
      const submission = await prisma.submission.findUnique({
        where: { id: submissionId }
      });

      if (!submission) {
        throw new Error("Submission not found");
      }

      if (!submission.code) {
        throw new Error("Code missing");
      }

      await prisma.submission.update({
        where: { id: submissionId },
        data: { status: SubmissionStatus.PROCESSING }
      });

      const result = await evaluationPipeline.run(submission.code);

      await prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: SubmissionStatus.COMPLETED,
          result: result
        }
      });

    } catch (error: any) {
      await prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: SubmissionStatus.FAILED,
          error: error.message
        }
      });
    }
  },
  {
    connection: redisConnection
  }
);