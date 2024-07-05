/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import "dotenv/config";

import express, { NextFunction } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { errors } from "celebrate";
// import cors from "cors";
import errorHandler from "./middlewares/error-handler";
import { DB_ADDRESS } from "./config";
import routes from "./routes";

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(DB_ADDRESS);

// Только для локальных тестов. Не используйте это в продакшене
// app.use(cors({ origin: "*" }));
app.use(function (req, res, next: NextFunction) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log("ok"));
