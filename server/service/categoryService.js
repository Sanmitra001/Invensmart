import categoryRepo from "../db/categoryRepo.js";

import AppError from "../error/AppError.js";

// Add new catagory to database and set it in redis cache with expiration time of 1 hour.
const addCatagory = async (CategoryName, Description) => {
  try {
    const insertedID = await categoryRepo.addCategory(
      CategoryName,
      Description
    );
    if (!insertedID) {
      throw new Error("Failed to add Category");
    }
    return insertedID;
  } catch (err) {
    if (err.message === "Failed to add Category") {
      throw new AppError(err.message, 500);
    }
    throw new AppError(err.message, 404);
  }
};

const getCatagoryByIdService = async (id) => {
  try {
    const userData = await categoryRepo.getCtagoryById(id);
    if (!userData) {
      throw new Error("Category not found");
    }
    return userData;
  } catch (err) {
    if (err.message === "Category not found") {
      throw new AppError(err.message, 500);
    }
    throw new AppError(err.message, 404);
  }
};

export default {
  addCatagory,
  getCatagoryByIdService,
};
