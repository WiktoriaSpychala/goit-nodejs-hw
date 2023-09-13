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
  validateData,
  validateStatus,
  validId,
} = require("../../middlewares/validate");
const auth = require("../../middlewares/authorize");
const { addSchema, updateFavoriteSchema } = require("../../schemas/contacts");

const router = express.Router()

router.get("/", auth, getAllContacts);
router.get("/:contactId", auth, validId, getContactById);
router.post("/", auth, validateData(addSchema), addContact);
router.delete("/:contactId", auth, validId, removeContact);
router.put("/:contactId", auth, validId, validateData(addSchema), updateContact);
router.patch("/:contactId/favorite", auth, validId, validateStatus, validateData(updateFavoriteSchema), updateStatusContact);

module.exports = router;
