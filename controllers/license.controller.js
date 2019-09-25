var mongoose = require("mongoose");
var License = mongoose.model("License");

module.exports.createLicense = (req, res, next) => {
  var license = new License(req.body);

  license.save((err, doc) => {
    if (err) res.status(500).json(err);
    else res.status(200).json({ doc: doc });
  });
};

module.exports.update = (req, res, next) => {
  License.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, doc) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(doc);
    }
  );
};
module.exports.delete = (req, res, next) => {
  License.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(doc);
  });
};

module.exports.getAll = (req, res, next) => {
  License.find((err, docs) => {
    if (err) res.status(400).json(err);
    else res.status(200).json({ docs: docs.reverse() });
  });
};

module.exports.getById = (req, res, next) => {
  License.findById(req.params.id, (err, doc) => {
    if (err) res.status(400).json(err);
    else res.status(200).json({ doc: doc });
  });
};
