var mongoose = require("mongoose");
var Company = mongoose.model("Company");

module.exports.companiesList = (req, res, next) => {
  Company.find((err, companies) => {
    if (err) res.json(err);
    else res.json({ status: true, companies: companies.reverse() });
  });
};

module.exports.findById = (req, res, next) => {
  Company.findOne({ _id: req.params.id }, (err, company) => {
    if (err) res.json(err);
    else res.json({ status: true, company: company });
  });
};

module.exports.createCompany = (req, res, next) => {
  var company = Company();
  company.fullName = req.body.fullName;
  company.type = req.body.type;
  company.registrationNumber = req.body.registrationNumber;
  company.industry = req.body.industry;
  company.headquarters = req.body.headquarters;
  company.areaServed = req.body.areaServed;
  company.website = req.body.website;
  company.email = req.body.email;
  company.phoneNumber = req.body.phoneNumber;

  company.save((err, doc) => {
    if (err) res.json(err);
    else res.json({ status: true, company: doc });
  });
};

module.exports.update = (req, res, next) => {
  Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    }
  );
};

module.exports.delete = (req, res, next) => {
  Company.findByIdAndDelete(req.params.id, (err, company) => {
    if (err) res.json(err);
    else res.json({ status: true, "deleted company": company });
  });
};
