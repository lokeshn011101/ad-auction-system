import express from "express";
import {
  startAuctionController,
  registerBidderController,
  listBiddersController,
} from "../../controllers/index.js";

const router = express.Router();

router.post("/start_auction", startAuctionController);

router.put("/register_bidder", registerBidderController);

router.get("/list_bidders", listBiddersController);

export default router;
