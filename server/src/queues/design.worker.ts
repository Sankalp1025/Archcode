import { Worker } from "bullmq";
import { redisConnection } from "../config/redis";
import { prisma } from "../config/db";
import { evaluationPipeline } from "../pipelines/evaluation.pipeline";
import { SubmissionStatus } from "@prisma/client";

export const designWorker = new Worker(
  "submission-queue",
  async (job) => {
    
    console.log("Worker received job:",job.data);

    const { submissionId, answer } = job.data;

    try {
      await prisma.submission.update({
        where: { id: submissionId },
        data: { status: SubmissionStatus.PROCESSING },
      });


      const evaluationResult = await evaluationPipeline.run(answer);

      const {score,feedback,} = evaluationResult;

      

      await prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: SubmissionStatus.COMPLETED,
          result: evaluationResult,
          score: Number(score) || 0,
          aiFeedback: feedback,
        },
      });

    } catch (error: any) {
  
      await prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: SubmissionStatus.FAILED,
          error: error.message,
        },
      });
    }
  },
  {
    connection: redisConnection,
  }
);