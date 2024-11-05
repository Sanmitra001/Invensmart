import AppError from "../error/AppError.js";
import userService from "../service/userService.js";
import Token from "../middleware/token.js";

const addUser = async (req, res, next) => {
  const { username, password, role, email, fullName } = req.body;
  try {
    const userId = await userService.addUserService(
      username,
      password,
      role,
      email,
      fullName
    );
    res.status(201).json({ message: "User added successfully.", userId });
  } catch (error) {
    // console.error(error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw new AppError("Username and Password are Required", 404);
    }
    const loginUserDetails = await userService.loginUserService(
      username,
      password
    );
    if (!loginUserDetails) {
      throw new AppError("Invalid username or password", 401);
    }
    // console.log(loginUserDetails.Role);

    const token = await Token.createToken({
      username: username,
      role: loginUserDetails.Role,
    });
    if (!token) {
      throw new AppError("Failed to generate token", 500);
    }
    res
      .status(200)
      .json({ message: "User logged in successfully.", token: token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default {
  addUser,
  loginUser,
};
