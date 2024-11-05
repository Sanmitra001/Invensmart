import express from "express";
import userRoute from "./userRoute.js";
import productRoute from "./productRoute.js";
<<<<<<< HEAD
import transactionsRoute from "./transactionRoute";

=======
import transactionsRoute from "./transactionRoute.js";
import categoryRoute from "./categoryRouter.js";
>>>>>>> 15e7462e6f93f8b5ecf872812502f92276b432c1

const Router = express.Router();

Router.use("/", userRoute);
Router.use("/products", productRoute);
Router.use("/transactions", transactionsRoute);


export default Router;
