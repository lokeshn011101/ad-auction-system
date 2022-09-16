import redisClient from "../redis/index.js";
import app from "../app.js";

export default async (req, res) => {
  const bidders = await redisClient.hGetAll(app.locals.AUCTIONEER_ID);
  res.status(200).json({ comment: "OK", ...bidders });
};
