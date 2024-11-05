import express from "express"
import userController from "../controller/userController.js";

const userRoute = express.Router();

userRoute.post("/register", userController.addUser);
userRoute.post("/login", userController.loginUser);

export default userRoute;