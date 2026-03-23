import * as submissionRepo from "../../repositories/submission.repository";
import { evaluationPipeline } from "../../pipelines/evaluation.pipeline";
import { SubmissionStatus } from "@prisma/client";

type SubmissionInput = {
  answer: string;
};

export const handleSubmission = async (data: SubmissionInput) => {
  const evaluation = await evaluationPipeline.run(data.answer);

  await submissionRepo.create({
    answer: data.answer,
    version: 1,
    status: SubmissionStatus.ACCEPTED,
    score: 80,
    scalabilityScore: 75,
    consistencyScore: 70,
    clarityScore: 85,
    aiFeedback: evaluation.feedback,
    userId: "temp-user",
    problemId: "temp-problem",
  });
};