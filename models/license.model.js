var mongoose = require("mongoose");
var licenseSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.Mixed,
  geometry: mongoose.Schema.Types.Mixed,
  properties: mongoose.Schema.Types.Mixed
});
mongoose.model("License", licenseSchema);
