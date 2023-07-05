import asyncHandler from "express-async-handler";
import User from "../models/user.js";

/**
 * @swagger
 * /users/get:
 *   get:
 *     tags:
 *       - Users
 *     summary: Return logged in user details
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    const message = "User profile details.";
    const user = req.user;
    res.json({ message, user });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @swagger
 * /users/update:
 *   post:
 *     tags:
 *       - Users
 *     summary: Update User Profile
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: name
 *          description: User name
 *          type: string
 *        - in: query
 *          name: email
 *          description: User email address
 *          type: string
 *        - in: query
 *          name: password
 *          description: Your password
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.query.name || user.name;
    user.email = req.query.email || user.email;

    if (req.query.password) {
      user.password = req.query.password;
    }

    const updatedUser = await user.save();
    const message = "User profiles updated successfully.";
    res.json({ message, updatedUser });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @swagger
 * /users/delete:
 *   post:
 *     tags:
 *       - Users
 *     summary: Delete user with email id
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: email
 *          description: User email address
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const deleteUser = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  if (user) {
    const deleted = await User.deleteOne({ email });
    if (deleted) {
      res.json({ message: "User profile deleted successfully" });
    }
  } else {
    res.status(404);
    throw new Error("User with this email not found");
  }
});

/**
 * @swagger
 * /users/list:
 *   get:
 *     tags:
 *       - Users
 *     summary: List users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  const message = "User profiles retrieved successfully";
  res.json({ message, users });
});
export { getUserProfile, updateUserProfile, deleteUser, listUsers };
