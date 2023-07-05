import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login User
 *     operationId: login
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: email
 *          description: "Your email"
 *          type: string
 *        - in: query
 *          name: password
 *          description: "Your password"
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.query;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);
    res.json({
      status: true,
      message: "Logged In Successful.",
      data: { user: user, token: token },
    });
  } else {
    res.json({
      status: false,
      message: "Invalid email or password.",
      data: [],
    });
  }
});

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register New User
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
 *        - in: query
 *          name: password_confirmation
 *          description: Confrim Your password
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.query;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.json({
      status: false,
      message: "User with this email already exists",
      data: [],
    });
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.json({
      status: true,
      message: "User Created Successfully.",
      data: user,
    });
  } else {
    res.json({
      status: false,
      message: "Invalid user data.",
      data: [],
    });
  }
});

/**
 * @swagger
 * /logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout user
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
const logoutUser = (req, res) => {
  if (req.user) {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.json({
      status: true,
      message: "Logged out successfully",
      data: [],
    });
  } else {
    res.json({
      status: false,
      message: "User not found.",
      data: [],
    });
  }
};

export { login, registerUser, logoutUser };
