import { Worker } from "bullmq";
import IORedis from "ioredis";
import { analyzeDesign } from "../services/ai.service";

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
    maxRetriesPerRequest: null,
});

export const designWorker = new Worker(
  "design-analysis",
  async (job) => {
    const { problemId, userDesign } = job.data;

    console.log("Processing job:", job.id);

    const result = await analyzeDesign(problemId, userDesign);

    console.log("Analysis done:", result);
  },
  { connection }
);