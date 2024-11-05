import { Router } from "express";
import auth from "../middleware/auth.js";

import transactionsController from "../controller/transactionsController.js";

const transactionsRoute = Router();

transactionsRoute.get(
  "/",
  auth.authenticate,
  auth.authorization,
  transactionsController.getTransaction
);
transactionsRoute.post(
  "/",
  auth.authenticate,
  transactionsController.addTransaction
);

export default transactionsRoute;
