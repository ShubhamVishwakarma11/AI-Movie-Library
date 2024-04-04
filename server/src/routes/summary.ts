import express from "express";
import { getAISummary } from "../controller/summaryController";

const router = express.Router();

router.get("/:movieId", getAISummary);

export default router;
