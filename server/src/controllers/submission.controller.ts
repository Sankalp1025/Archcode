import { Request, Response } from "express";
import { handleSubmission } from "../services/submission.service";

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const result = await handleSubmission(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Submission failed" });
  }
};