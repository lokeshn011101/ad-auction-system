import express from "express";
import auctioneerRoute from "./auctioneer.route.js";

const router = express.Router();

router.use("/auctioneer", auctioneerRoute);

export default router;
