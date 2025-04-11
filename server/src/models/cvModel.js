const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
  {
    personnal: {
      firstname: { type: String },
      lastname: { type: String },
      jobTitle: { type: String },
      email: { type: String },
      address: { type: String },
      phone: { type: String },
      city: { type: String },
      zip: { type: Number },
    },
    profile: { type: String },

    experiences: [
      {
        id: { type: Number },
        job: { type: String },
        employer: { type: String },
        city: { type: String },
        debutDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
        _id: false,
      },
    ],

    educations: [
      {
        id: { type: Number },
        title: { type: String },
        establishment: { type: String },
        city: { type: String },
        debutDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
        _id: false,
      },
    ],

    skills: [{ type: String }],
    languages: [
      {
        language: { type: String },
        level: { type: String },
        _id: false,
      },
    ],
    hobbies: [{ type: String }],
  },
  { timestamps: true }
);

const cvCollectionSchema = new mongoose.Schema({
  myCvs: [{ id: Number, title: String, content: cvSchema, _id: false }],
});

module.exports = mongoose.model("CvCollection", cvCollectionSchema);
