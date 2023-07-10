import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Employee from "../models/employee.js";
import Role from "../models/role.js";

/**
 * @DESC Verify JWT from authorization header Middleware
 */
const employeeAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403);

  const token = authHeader.split(" ")[2];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
         res.sendStatus(403); //invalid token
         throw new Error("Not authorized");
    }
      next();
    });
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

/**
 * @DESC Check Guard Middleware
 */
const checkGuard = (guard) => async (req, res, next) => {
  let { email } = req.body;

  //retrieve employee info from DB
  const employee = await Employee.findOne({ email });

  !guard == employee.guard
    ? res.status(401).json("Sorry you do not have access to this route")
    : next();
};

/**
 * @DESC Check User Permissions
 */
const checkPermissions = (requiredPermissions) => async (req, res, next) => {
  let { email } = req.body;

  //retrieve employee info from DB
  const employee = await Employee.findOne({ email });
  const role = await Role.findOne({ name: employee.role });
  !role.permissions.includes(requiredPermissions) || !employee.role !== 'Super Admin'
    ? res.status(401).json("Sorry you do not have access to this route")
    : next();
};

export { employeeAuth, checkGuard, checkPermissions };
