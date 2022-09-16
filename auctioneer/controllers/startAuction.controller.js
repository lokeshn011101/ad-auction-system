import app from "../app.js";
import redisClient from "../redis/index.js";
import axios from "axios";

export default async (req, res) => {
  if (!req.body.auctionId) {
    res.status(400).json({ comment: "The request body does not contain the required arguments" });
    return;
  }
  let bidPromises = [];
  let defaultBidder = { price: Number.NEGATIVE_INFINITY, bidderId: null };

  const bidders = await redisClient.hGetAll(app.locals.AUCTIONEER_ID);
  Object.keys(bidders).map((bidderId) => {
    const bidderUrl = bidders[bidderId] + "v1/bidder/get_bid";
    bidPromises.push(makePromiseWithTimeout(axios.get(bidderUrl), defaultBidder));
  });

  const bids = (await Promise.all(bidPromises)).filter((bid) => bid.price && bid.bidderId);
  const maximumBidder = bids.length
    ? bids.reduce((previousBid, currentBid) =>
        previousBid.price > currentBid.price ? previousBid : currentBid
      )
    : {};
  if (!maximumBidder.bidderId) res.status(204).json({ comment: "Deadline exceeded from bidders" });
  else res.status(200).json({ comment: "OK", ...maximumBidder });
};

const makePromiseWithTimeout = (promise, defaultBidder) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(defaultBidder), 200);
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => resolve(defaultBidder));
  });
};
