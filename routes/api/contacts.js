const express = require('express')
const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controlers/contacts');
const {
  validate,
  validateStatus,
} = require("../../middlewares/validate");


const router = express.Router()

router.get("/", getAllContacts);
router.get("/:contactId", getContactById);
router.post("/", validate, addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", validate, updateContact);
router.patch("/:contactId/favorite", validateStatus, updateStatusContact);

module.exports = router;
