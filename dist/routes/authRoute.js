"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/notesRoute.ts
const express_1 = require("express");
// import { googleLogin } from "../controller/authController"
const router = (0, express_1.Router)();
// Define your routes
// router.post('/signup',googleLogin );
router.get(`/login`);
// This is important
exports.default = router;
