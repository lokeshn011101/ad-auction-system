import express from "express";
import { bidderController } from "../../controllers/index.js";

const router = express.Router();

router.get("/get_bid", bidderController);

export default router;
