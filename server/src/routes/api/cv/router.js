const express = require("express");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");
const puppeter = require("puppeteer");

const router = express.Router();

handlebars.registerHelper("or", function (a, b) {
  return a || b;
});

router.post("/generate", async (req, res) => {
  const { templateName, userData } = req.body;

  const templatePath = path.join(
    __dirname,
    "../../..",
    "templates",
    `${templateName}.html`
  );

  if (!fs.existsSync(templatePath)) {
    res.status(404).json({ error: "Template non trouvé" });
    return;
  }

  const templateContent = fs.readFileSync(templatePath, "utf-8");
  const compiledTemplate = handlebars.compile(templateContent);
  const filledHtml = compiledTemplate(userData);

  const browser = await puppeter.launch();
  const page = await browser.newPage();
  await page.setContent(filledHtml);

  const pdfPath = path.join(
    __dirname,
    "../../../",
    "pdfs",
    `cv-${Date.now()}.pdf`
  );
  await page.pdf({ path: pdfPath, format: "A4" });

  await browser.close();

  // res.send({ pdfUrl: `http://localhost:5000/${path.basename(pdfPath)}` });
  res.setHeader("Content-Type", "application/pdf");
  res.download(pdfPath);
});

module.exports = router;
