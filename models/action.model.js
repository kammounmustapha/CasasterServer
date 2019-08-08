var mongoose = require("mongoose");
var shapeSchema = mongoose.Schema({
  name: String,
  status: { type: Number, min: 0, max: 1 },
  comments: String,
  dateDue: String,
  completed: String,
  ResponsibleUser: String,
  licenseId: String,
  createdAt: String
});
shapeSchema.set("timestamps", true);
mongoose.model("Action", shapeSchema);
