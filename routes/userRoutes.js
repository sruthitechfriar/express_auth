import express from "express";
import {
  deleteUser,
  getUserProfile,
  listUsers,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { deleteUserValidation } from "../requests/user/deleteUserRequest.js";
import { updateUserValidation } from "../requests/user/updateUserRequest.js";

const router = express.Router();

router.route("/get").get(protect, getUserProfile);
router.route("/update").post(protect, updateUserValidation, updateUserProfile);
router.route("/delete").post(protect, deleteUserValidation, deleteUser);
router.route("/list").get(protect, listUsers);

export default router;
