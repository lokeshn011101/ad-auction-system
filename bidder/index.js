import app from "./app.js";
import commandLineArgs from "command-line-args";
import crypto from "crypto";
import dotenv from "dotenv";
import ip from "ip";
import axios from "axios";

dotenv.config();

const commandLineArgsOptionDefinitions = [
  { name: "id", type: String, defaultOption: crypto.randomUUID() },
  { name: "delay", type: Number, defaultOption: 150 },
  { name: "port", type: Number, defaultOption: 5000 },
  { name: "auctioneerURL", type: String },
];
const currentCommandLineArgs = commandLineArgs(commandLineArgsOptionDefinitions);

// Adding the command line args and the bidder id in the locals object.
app.locals.DELAY = currentCommandLineArgs.delay;
app.locals.PORT = currentCommandLineArgs.port;
app.locals.AUCTIONEER_URL = currentCommandLineArgs.auctioneerURL;
app.locals.BIDDER_ID = currentCommandLineArgs.id;

app.listen(app.locals.PORT, () => {
  console.log(`Bidder running on port ${app.locals.PORT}`);
});

// Make API call to Auctioneer to register Bidder on server startup
axios.put(app.locals.AUCTIONEER_URL + "v1/auctioneer/register_bidder/", {
  bidderId: app.locals.BIDDER_ID,
  bidderUrl: "http://" + ip.address() + ":" + app.locals.PORT + "/",
});
