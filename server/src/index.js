const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDb = require("./config/db");
const apiRoutes = require("./routes/api/routes");

dotenv.config();
// connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", apiRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.info(`Server is listenning on port http://localhost:${PORT}`);
});
