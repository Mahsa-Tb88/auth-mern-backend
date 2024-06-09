import express from "express";
import { initialize } from "../controller/initialize.js";

const router = express.Router();

router.get("/misc/initialize", initialize);

export default router;
