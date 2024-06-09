import express from "express";
import { isLoggedIn } from "../middleWares/authMiddleWare.js";
import { updateUser } from "../controller/userController.js";
const router = express.Router();

router.put("/:id", isLoggedIn, updateUser);
export default router;
