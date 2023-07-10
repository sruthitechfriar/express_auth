import jwt from "jsonwebtoken";

const generateToken = (res, user, permissions) => {
  let token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      guard: user.guard,
      name: user.name,
      email: user.email,
      permissions: permissions
    },
    process.env.JWT_SECRET,
    { expiresIn: "3 days" }
  );
  return token;
};

export default generateToken;
