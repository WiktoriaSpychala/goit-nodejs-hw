const { isValidObjectId } = require("mongoose");

const validateData = (schemas) => {
  const validateContact = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    const { error, value } = schemas.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      return res.status(400).json({ message: `${error.details[0].message}` });
    }
    req.body = value;
    next();
  }
  return validateContact;
};

const validateStatus = (req, res, next) => {
  if (req.body && req.body.favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  next();
};

const validId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return res.status(400).json({ message: `${contactId} is not valid id` });
  }
}

module.exports = {
  validateData,
  validateStatus,
  validId,
};
