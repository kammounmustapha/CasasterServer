var mongoose = require("mongoose");
var licenseSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.Mixed,
  geometry: mongoose.Schema.Types.Mixed,
  properties: mongoose.Schema.Types.Mixed
});
licenseSchema.set("timestamps", true);
mongoose.model("License", licenseSchema);
