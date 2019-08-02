var mongoose = require("mongoose");
var licenseApplicationSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.Mixed,
  geometry: mongoose.Schema.Types.Mixed,
  properties: mongoose.Schema.Types.Mixed
});

mongoose.model("LicenseApplication", licenseApplicationSchema);
