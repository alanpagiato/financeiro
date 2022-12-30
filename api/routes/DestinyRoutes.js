const express = require("express");
const router = express.Router();

// Controller
const { getDestinys, insertDestiny, updateDestiny, deleteDestiny } = require("../controllers/DestinyController")

// Middlewares
const validate = require("../middlewares/handleValidation");
const { destinyValidation } = require("../middlewares/Validations");
const authGuard = require("../middlewares/authGuard");
const authGuardAdmin = require("../middlewares/authGuardAdmin");

// Routes
router.get("/", authGuard, getDestinys);
router.post("/", authGuard, destinyValidation(), validate, insertDestiny);
router.put("/:id", authGuard, destinyValidation(), validate , updateDestiny);
router.delete("/:id",authGuardAdmin, authGuard, deleteDestiny);

module.exports = router;