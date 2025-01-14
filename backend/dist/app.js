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
const ordersController_1 = require("./controllers/ordersController");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
const dbUri = process.env.DB_URI;
if (!dbUri) {
    throw new Error("DB_URI is not defined in the environment variables");
}
(0, dbService_1.default)(dbUri);
exports.io = new socket_io_1.default.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL }));
app.use("/api", orderRoute_1.default);
// app.get("/api/orders", async (req: Request, res: Response) => {
//   try {
//     const orders = await OrdersService.getAllOrders();
//     io.emit("ordersUpdated", orders);
//     res.status(200).json(orders);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// });
exports.io.on("connection", (socket) => {
    console.log("a user connected");
    (0, ordersController_1.getOrdersInterval)();
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Listening on port ${PORT} `);
}));
