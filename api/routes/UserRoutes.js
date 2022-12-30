const express = require("express");
const router = express.Router();

// Controller
const { register, login, getUsers, updateUser, deleteUser, getUserById } = require("../controllers/UserController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const { userInsertValidation, userLoginValidation, userUpdateValidation } = require("../middlewares/Validations");
const authGuard = require("../middlewares/authGuard");
const authGuardAdmin = require("../middlewares/authGuardAdmin");

// Routes
router.get("/", authGuardAdmin, authGuard , getUsers);
router.post("/register", authGuardAdmin, authGuard , userInsertValidation(), validate, register);
router.post("/login", userLoginValidation(), validate, login)
router.put("/:id", authGuardAdmin, authGuard , userUpdateValidation(), validate , updateUser);
router.delete("/:id", authGuardAdmin, authGuard , deleteUser);
router.get("/:id", authGuardAdmin, authGuard , getUserById);

module.exports = router;