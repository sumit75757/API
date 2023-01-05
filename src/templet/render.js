"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = (0, express_1.default)();
route.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});
exports.default = route;
//# sourceMappingURL=render.js.map