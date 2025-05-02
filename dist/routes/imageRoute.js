"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageUpload_1 = require("../middleware/imageUpload");
const cloudinary_controller_1 = require("../controller/cloudinary-controller");
const router = (0, express_1.Router)();
router.post('/uploadImg', imageUpload_1.uploadSingle, cloudinary_controller_1.uploadImage);
exports.default = router;
