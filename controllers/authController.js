import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Employee from "../models/employee.js";
import Role from "../models/role.js";

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login Employee
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
  const user = await Employee.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const role = await Role.findOne({ name:user.role });
    const token = generateToken(user,role.permissions);
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

export { login  };
