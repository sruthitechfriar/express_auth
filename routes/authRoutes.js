import {
  login,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.route("/logout").post(protect, logoutUser);

export default router;
