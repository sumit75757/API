"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const offers_model_1 = __importDefault(require("./offers.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const fs = require("fs");
const util_1 = require("util");
const unlinkAsync = (0, util_1.promisify)(fs.unlink);
const offers = {
    getOffers(req, res) {
        offers_model_1.default
            .find()
            .exec()
            .then((result) => {
            res.status(200).json({
                count: result.length,
                response: "success",
                result: result,
            });
        })
            .catch((err) => {
            res.status(400).send(err);
        });
    },
    postOffers(req, res) {
        let offerImage = req.file;
        const offer = new offers_model_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            offerImage: "/offerImage/" + (offerImage === null || offerImage === void 0 ? void 0 : offerImage.filename),
            category: req.body.category,
            crreatAt: Date(),
        });
        offer.save().then((result) => {
            res
                .status(201)
                .json({
                response: "success",
                message: "offer create",
                result: result,
            })
                .catch((err) => {
                res.status(400).send(err);
            });
        });
    },
    updateOffers(req, res) {
        var _a;
        const id = req.params.id;
        let image;
        if (req.file) {
            image = req.file;
        }
        let offer;
        if (req.file) {
            offer = {
                offerImage: "/offerImage/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename),
                category: req.body.category,
                productid: req.body.productid
            };
        }
        else {
            offer = {
                category: req.body.category,
                productid: req.body.productid
            };
        }
        offers_model_1.default
            .findByIdAndUpdate({
            _id: id,
        }, {
            $set: offer,
        })
            .then((result) => {
            res
                .status(201)
                .json({
                response: "success",
                message: "offer create",
                result: result,
            })
                .catch((err) => {
                res.status(400).send(err);
            });
        });
    },
    removeOffer(req, res) {
        let userImages = false;
        const id = req.params.id;
        let path;
        offers_model_1.default
            .findByIdAndRemove(id)
            .exec()
            .then((result) => {
            res.status(200).json(result);
            try {
                unlinkAsync("." + result.offerImage);
            }
            catch (err) {
                //console.log(err);
            }
            //console.log(result);
            userImages = true;
        })
            .catch((err) => {
            res.status(400).json(err.errors);
        });
    },
};
exports.default = offers;
//# sourceMappingURL=offers.controller.js.map