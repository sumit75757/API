"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const chackauth_1 = __importDefault(require("../../Middleware/chackauth"));
const service_controler_1 = __importDefault(require("./service.controler"));
const route = (0, express_1.default)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./serviceImage/");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const uplode = (0, multer_1.default)({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});
route.get("/", service_controler_1.default.getService);
route.post("/", uplode.array("serviceImage", 7), service_controler_1.default.postService);
route.put("/:id", uplode.array("serviceImage", 7), chackauth_1.default, service_controler_1.default.updateService);
route.delete("/:id", chackauth_1.default, service_controler_1.default.removeService);
exports.default = route;
//# sourceMappingURL=service.js.map