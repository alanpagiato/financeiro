const express = require("express");
const router = express.Router();

// Controller
const { insertAccount, getAccounts, updateAccount, deleteAccount } = require("../controllers/AccountController")

// Middlewares
const validate = require("../middlewares/handleValidation");
const { accountInsertValidation, accountUpdateValidation } = require("../middlewares/Validations");
const authGuard = require("../middlewares/authGuard");
const authGuardAdmin = require("../middlewares/authGuardAdmin");

// Routes
router.get("/", authGuard, getAccounts);
router.post("/", authGuard, accountInsertValidation(), validate, insertAccount);
router.put("/:id", authGuard, accountUpdateValidation(), validate , updateAccount);
router.delete("/:id", authGuardAdmin, authGuard, deleteAccount);

module.exports = router;