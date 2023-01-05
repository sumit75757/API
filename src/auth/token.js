"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cradansial_json_1 = __importDefault(require("./cradansial.json"));
require("dotenv").config();
const redirect_uri = window.location.origin;
// Replace with the code you received from Google
let code = "4/0AfgeXvuL2FQdGNW0m8hZ-HxW6Z-SGAilZpb-xq1hQU8TS2VwjUKAfyCj_pv4Zaj58hgAQg";
const { client_secret, client_id } = cradansial_json_1.default.web;
const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uri + "/");
oAuth2Client.getToken(code).then(({ tokens }) => {
    const tokenPath = path_1.default.join(__dirname, "token.json");
    fs_1.default.writeFileSync(tokenPath, JSON.stringify(tokens));
    //console.log("Access token and refresh token stored to token.json");
});
//# sourceMappingURL=token.js.map