const express = require("express");
const router = express.Router();

// Controller
const { getOrigins, insertOrigin, updateOrigin, deleteOrigin } = require("../controllers/OriginController")

// Middlewares
const validate = require("../middlewares/handleValidation");
const { originValidation } = require("../middlewares/Validations");
const authGuard = require("../middlewares/authGuard");
const authGuardAdmin = require("../middlewares/authGuardAdmin");

// Routes
router.get("/", authGuard, getOrigins);
router.post("/", authGuard, originValidation(), validate, insertOrigin);
router.put("/:id", authGuard, originValidation(), validate , updateOrigin);
router.delete("/:id",authGuardAdmin, authGuard, deleteOrigin);

module.exports = router;