import express from "express";
import {
  addEmployee,
  deleteUser,
  getUserProfile,
  listUsers,
  logoutUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { checkGuard, employeeAuth } from "../middleware/authMiddleware.js";
import { deleteUserValidation } from "../requests/employee/deleteUserRequest.js";
import { updateUserValidation } from "../requests/employee/updateUserRequest.js";
import { saveUserValidation } from "../requests/employee/saveUserRequest.js";

const router = express.Router();

router.route("/add").post(employeeAuth, addEmployee);
router.route("/get").get(employeeAuth, getUserProfile);
router.route("/update").post(employeeAuth, updateUserValidation, updateUserProfile);
router.route("/delete").post(employeeAuth, deleteUserValidation, deleteUser);
router.route("/list").get(employeeAuth, listUsers);
router.route("/logout").post(employeeAuth, logoutUser);


export default router;
