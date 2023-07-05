import express from "express";
import {
  deleteUser,
  getUserProfile,
  listUsers,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/get").get(protect, getUserProfile);
router.route("/update").post(protect, updateUserProfile);
router.route("/delete").post(protect, deleteUser);
router.route("/list").get(protect, listUsers);

export default router;
