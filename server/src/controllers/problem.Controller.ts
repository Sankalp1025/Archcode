import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProblem = async (req: Request, res: Response) => {
  try {
    // Extract from request
    const { title, description, difficulty, constraints } = req.body;

    // Save to DB
    const problem = await prisma.problem.create({
      data: {
        title,
        description,
        difficulty,
        constraints,
      },
    });

    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create problem" });
  }
};