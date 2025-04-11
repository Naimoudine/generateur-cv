const express = require("express");
const handlebars = require("handlebars");

const router = express.Router();

handlebars.registerHelper("or", function (a, b) {
  return a || b;
});

const {
  saveCv,
  generateCv,
  getAllCv,
  getCvById,
} = require("../../../controllers/cvController");

router.post("/generate", generateCv);
router.post("/:id", saveCv);
router.get("/", getAllCv);
router.get("/:id", getCvById);

module.exports = router;
