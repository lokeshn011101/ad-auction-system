import app from "../app.js";
import redisClient from "../redis/index.js";

export default async (req, res) => {
  if (!isValidRequest(req.body.bidderUrl, req.body.bidderId)) {
    res.status(400).json({ comment: "The request body does not contain the required arguments" });
    return;
  }

  const currentBidderId = req.body.bidderId;
  const currentBidderUrl = req.body.bidderUrl;
  const bidderWithExistingId = await redisClient.hGet(
    app.locals.AUCTIONEER_ID + "-urls",
    currentBidderUrl
  );
  if (bidderWithExistingId) {
    await redisClient.hDel(app.locals.AUCTIONEER_ID, bidderWithExistingId);
  }
  await redisClient.hSet(app.locals.AUCTIONEER_ID + "-urls", currentBidderUrl, currentBidderId);
  await redisClient.hSet(app.locals.AUCTIONEER_ID, currentBidderId, currentBidderUrl);
  res.status(200).json({ comment: "Bidder registered" });
};

const isValidRequest = (currentBidderUrl, currentBidderId) => {
  const validUrlRegex =
    /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
  return currentBidderUrl && currentBidderId && validUrlRegex.test(currentBidderUrl);
};
