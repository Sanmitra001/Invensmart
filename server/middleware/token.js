import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config("", {});

const createToken = async (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};

export default { createToken };
