"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./src/app"));
const socketIO = require("socket.io");
require("dotenv").config();
const port = process.env.PORT || process.env.PORT;
const httpServer = http_1.default.createServer(app_1.default);
let io = socketIO(httpServer);
httpServer.listen(port);
io.on("connection", (socket) => {
    //console.log(`User Connected: ${socket.id}`);
    socket.on("join_room", (data) => {
        socket.join(data);
        //console.log(`User with ID: ${socket.id} joined room: ${data.room}`);
    });
    socket.on("sendMessage", (data) => {
        //console.log(data);
        socket.to(data.room).except(data.room).emit("receive_message", data);
        socket._error((err) => {
            //console.log(err);
        });
    });
    socket.on("disconnect", () => {
        //console.log("User Disconnected", socket.id);
    });
});
//# sourceMappingURL=index.js.map