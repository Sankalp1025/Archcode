import { PrismaClient, SubmissionStatus } from "@prisma/client";
import { submissionQueue } from "../queues/submission.queue";

const prisma = new PrismaClient();

export const handleSubmission = async (data: any) => {
  try {
    console.log("Incoming submission:", data);

    const submission = await prisma.submission.create({
      data: {
        answer: data.answer,
        status: SubmissionStatus.PENDING,
        userId: "temp-user",        
        problemId: "temp-problem",  
      },
    });

    console.log("Created:", submission.id);

    await submissionQueue.add("evaluate", {
      submissionId: submission.id,
      answer: data.answer,
    });

    console.log("Job added to queue");

    return submission;

  } catch (error) {
    console.error("SERVICE ERROR:", error);
    throw error;
  }
};

export const getSubmissionById = async (id: string) => {
  return await prisma.submission.findUnique({
    where: { id },
  });
};