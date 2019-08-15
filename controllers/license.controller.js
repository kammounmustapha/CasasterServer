var mongoose = require("mongoose");
var License = mongoose.model("License");

module.exports.createLicense = (req, res, next) => {
  var license = new License({
    type: "Feature",
    geometry: {},
    properties: {
      applicationDate: new Date()
        .toString()
        .replace(/T/, ":")
        .replace(/\.\w*/, ""),
      status: req.body.status,
      parties: req.body.parties,
      grantDate: req.body.grantDate,
      expiryDate: req.body.expiryDate,
      commodityGroups: req.body.commodityGroups,
      jurisdiction: req.body.jurisdiction,
      region: req.body.region,
      district: req.body.district,
      project: req.body.project,
      responsibleOffice: req.body.responsibleOffice,
      comments: req.body.comments,
      companyId: req.body.companyId,
      userId: req.user.id
    }
  });

  license.save((err, doc) => {
    if (err) res.status(500).json(err);
    else res.status(200).json({ License: doc });
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
    else res.status(200).json({ docs: docs });
  });
};

module.exports.getById = (req, res, next) => {
  License.findById(req.params.id, (err, doc) => {
    if (err) res.status(400).json(err);
    else res.status(200).json({ doc: doc });
  });
};
