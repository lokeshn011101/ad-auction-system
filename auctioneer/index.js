import app from "./app.js";
import dotenv from "dotenv";
import commandLineArgs from "command-line-args";
import ip from "ip";

dotenv.config();

const commandLineArgsOptionDefinitions = [
  { name: "id", type: String },
  { name: "port", type: Number, default: 5000 },
];
const currentCommandLineArgs = commandLineArgs(commandLineArgsOptionDefinitions);

// Add Auctioneer's ID in the app's locals object
app.locals.AUCTIONEER_ID = currentCommandLineArgs.id;
app.locals.PORT = currentCommandLineArgs.port;

app.set("trust proxy", false);

app.listen(app.locals.PORT, () => {
  console.log(`Auctioneer running on port ${app.locals.PORT}`);
});
