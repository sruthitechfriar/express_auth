import asyncHandler from "express-async-handler";
import { make, Password } from "simple-body-validator";

const updateUserValidation = asyncHandler(async (req, res,next) => {
  const rules = {
    name: "required|string|min:3",
    email: "required|email",
    password: [
      "required",
      "confirmed",
      Password.create().min(8).mixedCase().numbers().symbols(),
    ],
    password_confirmation: [
      "required",
      Password.create().min(8).mixedCase().numbers().symbols(),
    ],
  };

  const messages = {
    "name.min": "The name field is too short.",
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
export { updateUserValidation };
