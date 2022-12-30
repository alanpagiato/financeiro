const express = require("express");
const router = express.Router();

// Controller
const { getPaymentMethods, insertPaymentMethod, updatePaymentMethod, deletePaymentMethod } = require("../controllers/PaymentMethodController")

// Middlewares
const validate = require("../middlewares/handleValidation");
const { paymentMethodValidation } = require("../middlewares/Validations");
const authGuard = require("../middlewares/authGuard");
const authGuardAdmin = require("../middlewares/authGuardAdmin");

// Routes
router.get("/", authGuard, getPaymentMethods);
router.post("/", authGuard, paymentMethodValidation(), validate, insertPaymentMethod);
router.put("/:id", authGuard, paymentMethodValidation(), validate , updatePaymentMethod);
router.delete("/:id",authGuardAdmin, authGuard, deletePaymentMethod);

module.exports = router;