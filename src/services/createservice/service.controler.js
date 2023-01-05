"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const service_model_1 = __importDefault(require("./service.model"));
const fs = require("fs");
const util_1 = require("util");
const unlinkAsync = (0, util_1.promisify)(fs.unlink);
let imageArr = [];
const services = {
    getService(req, res) {
        service_model_1.default.aggregate([
            {
                $lookup: {
                    from: "auths",
                    localField: "sellerId",
                    foreignField: "_id",
                    as: "seller",
                },
            },
        ])
            .then((result) => {
            let obj;
            result.forEach((element) => {
                element.seller.forEach((element) => {
                    obj = {
                        username: element.username,
                        email: element.email,
                        userImage: element.userImage,
                        phone: element.phone,
                        age: element.age,
                    };
                });
                element.seller = obj;
            });
            // ////console.log(result);
            res.status(200).json({
                message: "got all service",
                result: result,
            });
        })
            .catch((err) => {
            res.status(400).send(err);
        });
    },
    postService(req, res) {
        req.files.forEach((element) => {
            imageArr.push("/serviceImage/" + element.filename);
            ////console.log(element);
        });
        let service = new service_model_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            sellerId: req.body.sellerId,
            serviceName: req.body.serviceName,
            serviceInfo: req.body.serviceInfo,
            price: req.body.price,
            catogory: req.body.catogory,
            serviceImage: imageArr,
            discrption: req.body.discrption,
            nearLandMark: req.body.nearLandMark,
            area: req.body.area,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode,
            startTime: req.body.startTime,
            closeTime: req.body.closeTime,
            createAt: Date(),
        });
        service
            .save()
            .then((result) => {
            let obj = {
                message: "Service Created",
                result: result,
            };
            res.status(201).send(obj);
        })
            .catch((err) => {
            res.status(400).send(err);
        });
    },
    updateService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.files.length > 0 );
            if (req.files.length > 0) {
                req.files.forEach((element) => {
                    imageArr.push("/serviceImage/" + element.filename);
                });
            }
            const id = req.params.id;
            ////console.log(id);
            let data;
            if (req.body) {
                if (req.files.length > 0) {
                    data = {
                        serviceName: req.body.serviceName,
                        serviceInfo: req.body.serviceInfo,
                        price: req.body.price,
                        catogory: req.body.catogory,
                        serviceImage: imageArr,
                        discrption: req.body.discrption,
                        nearLandMark: req.body.nearLandMark,
                        area: req.body.area,
                        city: req.body.city,
                        state: req.body.state,
                        pincode: req.body.pincode,
                        startTime: req.body.startTime,
                        closeTime: req.body.closeTime,
                    };
                }
                else {
                    data = {
                        serviceName: req.body.serviceName,
                        serviceInfo: req.body.serviceInfo,
                        price: req.body.price,
                        catogory: req.body.catogory,
                        discrption: req.body.discrption,
                        nearLandMark: req.body.nearLandMark,
                        area: req.body.area,
                        city: req.body.city,
                        state: req.body.state,
                        pincode: req.body.pincode,
                        onhome: req.body.sethomepage,
                        startTime: req.body.startTime,
                        closeTime: req.body.closeTime,
                    };
                }
            }
            yield service_model_1.default.findByIdAndUpdate({
                _id: id,
            }, {
                $set: data,
            })
                .exec()
                .then((result) => {
                if (result) {
                    res.status(200).json({
                        success: true,
                        message: "service updated",
                        result,
                    });
                    let old = result.serviceImage;
                    let news = imageArr;
                    let count;
                    if (req.files.length > 0) {
                        if (old.join() != news.join()) {
                            if (news.length > old.length) {
                                count = news.length;
                            }
                            else {
                                count = old.length;
                            }
                            for (let index = 0; index < count; index++) {
                                const element = news[index];
                                const elementq = old[index];
                                if (element != elementq) {
                                    try {
                                        ////console.log("adfasdfasdfadsfa", elementq);
                                        unlinkAsync("." + elementq);
                                    }
                                    catch (err) {
                                        ////console.log(err);
                                    }
                                }
                                imageArr = [];
                            }
                        }
                    }
                    ////console.log(result);
                }
            })
                .catch((err) => {
                res.status(400).json(err);
                imageArr = [];
            });
        });
    },
    removeService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let serviceImage = false;
            const id = req.params.id;
            yield service_model_1.default.findByIdAndRemove(id)
                .exec()
                .then((result) => {
                serviceImage = true;
                res.status(200).json(result);
                try {
                    result.serviceImage.forEach((element) => {
                        ////console.log(element);
                        unlinkAsync("." + element);
                    });
                }
                catch (err) {
                    ////console.log(err);
                }
                // ////console.log(result);
            })
                .catch((err) => {
                res.status(500).json(err.errors);
            });
            ////console.log(serviceImage);
        });
    },
};
exports.default = services;
//# sourceMappingURL=service.controler.js.map