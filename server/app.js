import express from "express";
import dotenv from "dotenv";
import errorHandler from "./error/errorHandler.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/api", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
