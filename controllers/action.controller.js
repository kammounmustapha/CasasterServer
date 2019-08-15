var mongoose = require("mongoose");
var Action = mongoose.model("Action");

module.exports.create = (req, res, next) => {
  var action = new Action({
    name: req.body.name,
    status: req.body.status,
    comments: req.body.comments,
    dateDue: req.body.dateDue,
    completed: req.body.completed,
    responsibleUser: req.body.responsibleUser,
    licenseId: req.body.licenseId
  });
  action.save((err, doc) => {
    if (err) res.status(400).json(err);
    else res.status(200).json(doc);
  });
};

module.exports.delete = (req, res, next) => {
  Action.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) res.status(400).json(err);
    else res.status(200).json(doc);
  });
};

module.exports.update = (req, res, next) => {
  Action.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, doc) => {
      if (err) res.status(400).json(err);
      else res.status(200).json(doc);
    }
  );
};

module.exports.getAll = (req, res, next) => {
  Action.find({}, (err, docs) => {
    if (err) res.status(400).json(err);
    else res.status(200).json(docs);
  });
};

module.exports.get = (req, res, next) => {
  Action.findById(req.params.id, (err, doc) => {
    if (err) res.status(400).json(err);
    else res.status(200).json(doc);
  });
};
