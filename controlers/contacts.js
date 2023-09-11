const Contact = require("../models/contacts");

const getAllContacts = async (req, res) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndRemove(contactId);
  if (!removedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId} = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(updatedContact);
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
