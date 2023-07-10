import asyncHandler from "express-async-handler";
import { make, Password } from "simple-body-validator";

const createCategoryValidation = asyncHandler(async (req, res, next) => {
  const rules = {
    name: "required|string|min:3",
  };

  const validator = make()
    .setData(req.query)
    .setRules(rules)
    .setCustomMessages(messages);

  if (!validator.validate()) {
    const errors = validator.errors().all();
    res.json({ status: false, message: "Validation failed", errors: errors });
  }
  next();
});
export { createCategoryValidation };
