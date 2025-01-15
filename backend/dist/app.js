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
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const dbService_1 = __importDefault(require("./services/dbService"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const socket_1 = require("./utils/socket");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 3000;
const dbUri = process.env.DB_URI;
if (!dbUri) {
    throw new Error("DB_URI is not defined in the environment variables");
}
(0, dbService_1.default)(dbUri);
exports.io = new socket_io_1.default.Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
    },
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL }));
app.use("/api", orderRoute_1.default);
exports.io.on("connection", socket_1.socketHandler);
(0, socket_1.streamLive)();
exports.io.on("updatePollingTime", socket_1.updateIntervalHandler);
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Listening on port ${PORT} `);
}));
