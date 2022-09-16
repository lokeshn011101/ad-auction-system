import express from "express";
import bidderRoute from "./bidder.route.js";

const router = express.Router();

router.use("/bidder", bidderRoute);

export default router;
