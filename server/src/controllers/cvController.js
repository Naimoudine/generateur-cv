const cvCollection = require("../models/cvModel");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");
const puppeteer = require("puppeteer");

const saveCv = async (req, res) => {
  const id = req.params.id;

  try {
    const newCv = {
      id,
      title: req.body.title,
      content: req.body.content,
    };

    let collection = await cvCollection.findOne();

    if (!collection) {
      collection = new cvCollection({
        myCvs: [newCv],
      });

      await collection.save();
      return res.status(201).json({ message: "Le cv a bien été crée." });
    }

    const cvIndex = collection.myCvs.findIndex((cv) => cv.id === id);

    if (cvIndex === -1) {
      collection.myCvs.push(newCv);
      await collection.save();
      return res.status(201).json({ message: "Le cv a bien été crée." });
    }

    collection.myCvs[cvIndex].title = newCv.title;
    collection.myCvs[cvIndex].content = newCv.content;

    await collection.save();
    return res.status(200).json({ message: "Le cv a bien été mis à jour" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateCv = async (req, res) => {
  try {
    const { templateName, userData } = req.body;

    console.log(templateName);

    const templatePath = path.join(
      __dirname,
      "../",
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

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(filledHtml);

    const pdfPath = path.join(__dirname, "../", "pdfs", `cv-${Date.now()}.pdf`);
    await page.pdf({ path: pdfPath, format: "A4" });

    await browser.close();

    // res.send({ pdfUrl: `http://localhost:5000/${path.basename(pdfPath)}` });
    res.setHeader("Content-Type", "application/pdf");
    res.download(pdfPath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveCv, generateCv };
