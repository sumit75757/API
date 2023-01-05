"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import cat from "./addCat.modal";
// import subcatmoduel from "./subCategory/subCategory.modual";
const catogory_model_1 = __importDefault(require("./catogory.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const catagory = {
    getCatagory(req, res) {
        catogory_model_1.default.find()
            .then((result) => {
            //console.log(result);
            let obj = {
                count: result.length,
                response: "sucsess",
                data: result,
            };
            res.status(200).json(obj);
        })
            .catch((err) => {
            //console.log("ERROR", err);
        });
    },
    //////getCatogory//////////
    addCatagory(req, res) {
        //console.log(req.body);
        const catogory = new catogory_model_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            catgory: req.body.catgory,
            name: req.body.name,
            crreatAt: Date(),
        });
        catogory
            .save()
            .then((result) => {
            res.status(201).json(result);
        })
            .catch((err) => {
            res.status(400).json(err);
        });
    },
    updateCatagory(req, res) {
        const id = req.params.id;
        const catogory = {
            catgory: req.body.catgory,
            name: req.body.name,
            updateAt: Date(),
        };
        //console.log(catogory, id);
        catogory_model_1.default
            .findOneAndUpdate({
            _id: id,
        }, {
            $set: catogory,
        })
            .exec()
            .then((result) => {
            if (result) {
                const returnData = {
                    status: true,
                    time: Date(),
                    message: "Data updated",
                    data: result,
                };
                res.status(200).json(returnData);
            }
            else {
                res.json({
                    massage: "Some thing wrong ",
                });
            }
        })
            .catch((err) => {
            res.status(500).json(err.errors);
        });
    },
    removeCatagory(req, res) {
        //console.log(req.body);
        const id = req.params.id;
        //console.log(id);
        catogory_model_1.default
            .remove({
            _id: id,
        })
            .exec()
            .then((result) => {
            res.status(200).json(result);
        })
            .catch((err) => {
            res.status(500).json(err.errors);
        });
    },
    // tslint:disable-next-line:no-empty
    getByCatagory(req, res) {
        const id = req.params.id;
        catogory_model_1.default
            .findById(id)
            .exec()
            .then((result) => {
            if (result) {
                res.status(200).json(result);
            }
            else {
            }
        })
            .catch((err) => {
            res.status(404).json(err);
        });
    },
};
// function filtera() {}
// // tslint:disable-next-line:no-unused-expression
exports.default = catagory;
//# sourceMappingURL=catogory.controll.js.map