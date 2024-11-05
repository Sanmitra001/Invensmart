import Apperror from "../error/AppError.js";
// const catagorieService = require("../service/catagory")
import categoryService from "../service/categoryService.js";

// only added by the admins
const addCatagory = async (req, res, next) => {
  const { CatagoryName, Description } = req.body;
  try {
    const ans = await categoryService.addCatagory(CatagoryName, Description);

    if (!ans) {
      throw new Apperror("unable to add catagory", 400);
    }
    res
      .status(200)
      .json({ message: "added catagory successfully", InsertedID: ans });
  } catch (err) {
    next(err);
  }
};

const getCatagoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ans = await categoryService.getCatagoryByIdService(id);
    if (!ans) {
      throw new Apperror("Catagory not found", 404);
    }
    res.status(200).json(ans);
  } catch (err) {
    next(err);
  }
};

export default {
  addCatagory,
  getCatagoryById,
};
