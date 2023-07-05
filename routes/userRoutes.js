import express from "express";
import {
  getUserProfile,
  updateUserProfile
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/get_profile").get(protect, getUserProfile);
router.route("/update_profile").post(protect, updateUserProfile);


export default router;
