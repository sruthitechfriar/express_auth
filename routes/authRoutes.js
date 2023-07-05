import {
  login,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";
import { loginValidation } from "../requests/auth/loginRequest.js";
import { saveUserValidation } from "../requests/user/saveUserRequest.js";

const router = express.Router();

router.post("/login",loginValidation, login);
router.post("/register",saveUserValidation, registerUser);
router.route("/logout").post(protect, logoutUser);

export default router;
