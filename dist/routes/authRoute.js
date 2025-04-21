"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/notesRoute.ts
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const router = (0, express_1.Router)();
// Define your routes
router.post('/signup', authController_1.SignUp);
router.get(`/login`);
// This is important
exports.default = router;
