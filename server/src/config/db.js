const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connectée ✅");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB ❌:", error);
    process.exit(1);
  }
};

module.exports = connectDb;
