var mongoose = require("mongoose");

var companySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "Full name cannot be empty"
  },
  type: {
    type: String,
    required: "Type must be specified"
  },
  registrationNumber: {
    type: String,
    required: "registration number must be specified"
  },
  industry: {
    type: String
  },
  headquarters: {
    type: String
  },
  areaServed: {
    type: String
  },
  website: {
    type: String
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  }
});

mongoose.model("Company", companySchema);
