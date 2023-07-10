import asyncHandler from "express-async-handler";
import { make } from "simple-body-validator";

const deleteUserValidation = asyncHandler(async (req, res,next) => {
  const rules = {
    email: "required|email",
  };
  const validator = make().setData(req.query).setRules(rules);

  if (!validator.validate()) {
    const errors = validator.errors().all();
    res.json({ status: false, message: "Validation failed", errors: errors });
  }
  next();
});
export { deleteUserValidation };
