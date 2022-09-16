import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/v1/index.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/v1", routes);

export default app;
