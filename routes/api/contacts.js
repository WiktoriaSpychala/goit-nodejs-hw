const express = require('express')
const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../controlers/contacts');
const validate = require("../../middlewares/validate");


const router = express.Router()

router.get("/", getAllContacts);
router.get("/:contactId", getContactById);
router.post("/", validate, addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", validate, updateContact);


module.exports = router;
