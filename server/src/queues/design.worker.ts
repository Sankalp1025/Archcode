import { Worker } from "bullmq";
import { redisConnection } from "../config/redis";
import { prisma } from "../config/db";
import { EvaluationService } from "../modules/evaluation/evaluation.service";
import { SubmissionStatus } from "@prisma/client";

const evaluationService = new EvaluationService();

export const designWorker = new Worker(
  "submission-queue",
  async (job) => {
    const { submissionId } = job.data;

    try {
      const submission = await prisma.submission.findUnique({
        where: { id: submissionId },
      });

      if (!submission) {
        throw new Error("Submission not found");
      }

      if (submission.status === SubmissionStatus.COMPLETED) {
        console.log("Already processed, skipping...");
        return;
      }

      if (!submission.code) {
        throw new Error("Submission code missing");
      }

      await prisma.submission.update({
        where: { id: submissionId },
        data: { status: SubmissionStatus.PROCESSING },
      });

      let result;

try {
  result = await evaluationService.evaluate({
    answer: submission.code,
  });
} catch (err) {
  console.error("AI evaluation failed:", err);

  result = {
    score: 50,
    feedback: "Evaluation failed. Please try again.",
  };
}

      await prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: SubmissionStatus.COMPLETED,
          score: result.score,
          aiFeedback: result.feedback,
        },
      });

    } catch (error: any) {
      console.error("Worker failed:", error);

      await prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: SubmissionStatus.FAILED,
          error: error.message,
        },
      });

      throw error;
    }
  },
  {
    connection: redisConnection,
  }
);