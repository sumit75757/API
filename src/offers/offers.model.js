"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const offers = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    offerImage: { type: String, required: true },
    category: { type: String, required: true },
    productid: { type: String, required: true },
    crreatAt: { type: String, required: false },
});
exports.default = mongoose_1.default.model("offers", offers);
//# sourceMappingURL=offers.model.js.map