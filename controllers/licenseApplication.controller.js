var mongoose = require("mongoose");
var LicenseApplication = mongoose.model("LicenseApplication");
var companyctrl = require("../controllers/company.controller");
var Company = mongoose.model("Company");

module.exports.createLicenseApplication = async (req, res, next) => {
  try {
    var licenseApplication = new LicenseApplication({
      type: "Feature",
      geometry: {},
      properties: {
        name: req.body.name,
        type: req.body.type,
        parties: req.body.parties,
        peggedDate: req.body.peggedDate,
        commodityGroups: req.body.commodityGroups,
        jurisdiction: req.body.jurisdiction,
        region: req.body.region,
        district: req.body.district,
        project: req.body.project,
        responsibleOffice: req.body.responsibleOffice,
        comments: req.body.comments,
        approved: "0",
        user: req.user
      }
    });
    var company = await Company.findById(req.body.companyId);
    licenseApplication.properties.company = company;

    licenseApplication.save((err, doc) => {
      if (err) res.status(500).json(err);
      else res.status(200).json({ LicenseApplication: doc });
    });
  } catch (err) {
    res.status(404).json("company not found");
  }
};

module.exports.update = (req, res, next) => {
  LicenseApplication.findByIdAndUpdate(
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
  LicenseApplication.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(doc);
  });
};

module.exports.getAll = (req, res, next) => {
  LicenseApplication.find((err, docs) => {
    if (err) res.status(400).json(err);
    else res.status(200).json({ docs: docs });
  });
};

module.exports.getById = (req, res, next) => {
  LicenseApplication.findById(req.params.id, (err, res) => {
    if (err) res.status(400).json(err);
    else res.status(200).json({ doc: res });
  });
};
