"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error('Caught by error handler:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
};
exports.errorHandler = errorHandler;
