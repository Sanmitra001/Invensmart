import AppError from "../error/AppError.js";
import userRepo from "../db/userRepo.js";

const addUserService = async ( username, password, role, email, fullName) => {
    try {
        const insertId = await userRepo.addUserRepo(username, password, role, email, fullName);
        if (!insertId) {
            throw new Error("Failed to add user");
        }
        return insertId;
    } catch (error) {
        if(error.message === "Failed to add user"){
            throw new AppError(error.message,500);
        }
        throw new AppError(error.message,404);
    }
}
const loginUserService = async (username, password) => {
    const loginUserDetails = await userRepo.loginUserRepo(username, password);
    return loginUserDetails;
}

export default {
    addUserService,
    loginUserService,
 };
 