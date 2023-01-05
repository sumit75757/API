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
const product_model_1 = __importDefault(require("./product.model"));
const fs = require("fs");
const util_1 = require("util");
const unlinkAsync = (0, util_1.promisify)(fs.unlink);
let imageArr = [];
const product = {
    postProduct(req, res) {
        req.files.forEach((element) => {
            imageArr.push("/productImage/" + element.filename);
            //console.log(imageArr);
        });
        const product = new product_model_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            sellerId: req.body.sellerId,
            productName: req.body.productName,
            productInfo: req.body.productInfo,
            price: req.body.price,
            catogory: req.body.catogory,
            inStock: req.body.inStock,
            productImage: imageArr,
            discrption: req.body.discrption,
            subCatogory: req.body.subCatogory,
            delevery: req.body.delevery,
            createAt: Date(),
        });
        product
            .save()
            .then((result) => {
            const data = {
                success: true,
                message: "Product added",
                result,
            };
            res.status(201).json(data);
            imageArr = [];
        })
            .catch((err) => {
            res.status(404).json(err);
            //console.log("dfasdfaSDFASDFA", err);
        });
    },
    getProduct(req, res) {
        // //console.log(req.query.username);
        // const id = req.query.product;
        // const fin = { _id: id }
        // if (id != null && id !== "" && id != undefined) {
        //     productModel.find().exec().then((result: any) => {
        //         if (result) {
        //             res.status(200).json(result)
        //             //console.log("fasdfasdfsa", result)
        //         } else {
        //             res.status(404).json({
        //                 code: "404",
        //                 massage: "Not Found"
        //             })
        //             //console.log(result)
        //         }
        //     }).catch((err: any) => {
        //         res.status(500).json(err.errors)
        //     });
        // }
        product_model_1.default
            .find()
            .skip(req.query.skip)
            .limit(10)
            .exec()
            .then((result) => {
            if (result) {
                res.status(200).json({
                    response: {
                        count: result.length,
                        request: "GEt",
                        respons: "succses",
                    },
                    data: result.map((data) => {
                        return {
                            _id: data._id,
                            productName: data.productName,
                            productInfo: data.productInfo,
                            price: data.price,
                            catogory: data.catogory,
                            productImage: data.productImage,
                            discrption: data.discrption,
                            onhome: data.onhome,
                            createAt: data.createAt,
                        };
                    }),
                });
            }
            else {
                res.status(404).json(result);
            }
        })
            .catch((err) => {
            res.status(404).send(err.errors);
        });
    },
    productgetbyid(req, res) {
        const id = req.params.id;
        product_model_1.default
            .findById(id)
            .exec()
            .then((result) => {
            if (result) {
                res.status(200).json(result);
                //console.log(result);
            }
            else {
                res.status(404).json({
                    code: "404",
                    massage: "Not Found",
                });
                //console.log(result);
            }
        })
            .catch((err) => {
            res.status(500).json(err.errors);
        });
    },
    productupdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            if (req.files) {
                req.files.forEach((element) => {
                    imageArr.push("/productImage/" + element.filename);
                });
            }
            // console.log(req.body.sethomepage);
            //     data = {
            //       onhome:req.body.sethomepage
            // }
            console.log(data);
            const id = req.params.id;
            if (req.files) {
                data = {
                    sellerId: req.body.sellerId,
                    productName: req.body.productName,
                    productInfo: req.body.productInfo,
                    price: req.body.price,
                    catogory: req.body.catogory,
                    inStock: req.body.inStock,
                    productImage: imageArr,
                    discrption: req.body.discrption,
                };
            }
            else {
                data = {
                    sellerId: req.body.sellerId,
                    productName: req.body.productName,
                    productInfo: req.body.productInfo,
                    price: req.body.price,
                    catogory: req.body.catogory,
                    inStock: req.body.inStock,
                    discrption: req.body.discrption,
                    onhome: req.body.sethomepage,
                };
            }
            product_model_1.default
                .findByIdAndUpdate({ _id: id }, { $set: data })
                .exec()
                .then((result) => {
                if (result) {
                    res.status(200).json({
                        success: true,
                        message: "data updated",
                        result,
                    });
                }
            })
                .catch((err) => {
                res.status(400).json(err);
            });
            imageArr = [];
        });
    },
    removeProduct(req, res) {
        let userImages = false;
        const id = req.params.id;
        product_model_1.default
            .findByIdAndRemove(id)
            .exec()
            .then((result) => {
            res.status(200).json(result);
            try {
                result.productImage.forEach((element) => {
                    unlinkAsync("." + element);
                });
            }
            catch (err) {
                console.log(err);
            }
            userImages = true;
        })
            .catch((err) => {
            res.status(500).json(err.errors);
        });
    },
};
exports.default = product;
//# sourceMappingURL=product.controll.js.map