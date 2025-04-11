const express = require("express");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");
const puppeter = require("puppeteer");

const router = express.Router();

handlebars.registerHelper("or", function (a, b) {
  return a || b;
});

const { saveCv, generateCv } = require("../../../controllers/cvController");

router.post("/generate", generateCv);

router.post("/:id", saveCv);

module.exports = router;
