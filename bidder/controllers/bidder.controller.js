import app from "../app.js";

const causeDelay = async () => {
  return new Promise((resolve) => setTimeout(resolve, app.locals.DELAY));
};

const getBidValue = () => {
  return Math.random() * 100;
};

export default async (req, res) => {
  await causeDelay();
  res.status(200).json({ bidValue: getBidValue(), bidderId: app.locals.BIDDER_ID });
};
