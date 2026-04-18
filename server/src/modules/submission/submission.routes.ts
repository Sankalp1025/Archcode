import express from "express";
import { submitAnswer } from "./submission.controller";

const router = express.Router();

router.post("/submit", submitAnswer);

export default router;