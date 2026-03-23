import { Router } from "express";
import { evaluateController } from "../controllers/ai.controller";

const router = Router();

router.post("/evaluate", evaluateController);

export default router;