import {
  login,
} from "../controllers/authController.js";
import express from "express";
import { loginValidation } from "../requests/employee/loginRequest.js";

const router = express.Router();

router.post("/login",loginValidation, login);

export default router;
