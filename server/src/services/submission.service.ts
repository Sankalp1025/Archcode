import { PrismaClient, SubmissionStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const handleSubmission = async (data: any) => {
  const { userId, problemId, answer } = data;

  // Get latest version
  const lastSubmission = await prisma.submission.findFirst({
    where: { userId, problemId },
    orderBy: { version: "desc" },
  });

  const newVersion = lastSubmission ? lastSubmission.version + 1 : 1;

  // Fake AI evaluation (will replace with real AI later)
 const aiResult = {
  score: Math.floor(Math.random() * 100),
  scalabilityScore: Math.floor(Math.random() * 100),
  consistencyScore: Math.floor(Math.random() * 100),
  clarityScore: Math.floor(Math.random() * 100),
  feedback: "Good design, but can improve scalability",
  status: SubmissionStatus.IMPROVING,
};

  // Save to DB
  const submission = await prisma.submission.create({
    data: {
      userId,
      problemId,
      answer,
      version: newVersion,
      status: aiResult.status,
      score: aiResult.score,
      scalabilityScore: aiResult.scalabilityScore,
      consistencyScore: aiResult.consistencyScore,
      clarityScore: aiResult.clarityScore,
      aiFeedback: aiResult.feedback,
    },
  });

  return submission;
};