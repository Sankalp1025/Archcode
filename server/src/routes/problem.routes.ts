import express from "express";
import { createProblem } from "../controllers/problem.Controller";

const router = express.Router();

router.post("/", createProblem);

export default router;