import { Request, Response } from "express";
import * as submissionService from "./submission.service";

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const result = await submissionService.handleSubmission(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};