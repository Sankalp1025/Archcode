import express from "express";
import { createSubmission } from "../controllers/submission.controller";

const router = express.Router();

router.post("/", createSubmission);

export default router;