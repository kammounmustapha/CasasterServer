var mongoose = require("mongoose");
var licenseApplicationSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.Mixed,
  geometry: mongoose.Schema.Types.Mixed,
  properties: mongoose.Schema.Types.Mixed
});
licenseApplicationSchema.set("timestamps", true);
mongoose.model("LicenseApplication", licenseApplicationSchema);
