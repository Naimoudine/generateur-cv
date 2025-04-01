const express = require("express");

const userRoutes = require("./users/routes");
const cvRoutes = require("./cv/router");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/cv", cvRoutes);

module.exports = router;
