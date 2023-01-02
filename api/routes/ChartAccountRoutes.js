const express = require("express");
const router = express.Router();

// Controller
const { getChartAccounts, insertChartAccount, updateChartAccount, deleteChartAccount } = require("../controllers/ChartAccountController")

// Middlewares
const validate = require("../middlewares/handleValidation");
const { chartAccountValidation } = require("../middlewares/Validations");
const authGuard = require("../middlewares/authGuard");
const authGuardAdmin = require("../middlewares/authGuardAdmin");

// Routes
router.get("/", authGuard, getChartAccounts);
router.post("/", authGuard, chartAccountValidation(), validate, insertChartAccount);
router.put("/:id", authGuard, chartAccountValidation(), validate , updateChartAccount);
router.delete("/:id",authGuardAdmin, authGuard, deleteChartAccount);

module.exports = router;