console.clear();
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRouter from "./routes/userRouter.js";
import miscRoutes from "./routes/miscRoutes.js";
import responseMiddleWare from "./middleWares/respondMiddleWares.js";
import { checkToken } from "./middleWares/authMiddleWare.js";
import corsMiddleware from "./middleWares/corsMiddleWare.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(corsMiddleware);
app.use(responseMiddleWare);
app.use(cookieParser());
app.use(checkToken);
app.use(miscRoutes);

app.use("/auth", authRoutes);
app.use("/user", userRouter);

try {
  await mongoose.connect(process.env.MONGODB);
  console.log("connected to database");

  app.listen(3000, () => {
    console.log("Server is running on http://localhost3000");
  });
} catch (e) {
  console.log(e.message);
}
