import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/orderRoute";
import connectToDatabase from "./services/dbService";
import http from "http";
import socketIo from "socket.io";
import {
  socketHandler,
  streamLive,
  updateIntervalHandler,
} from "./utils/socket";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const dbUri = process.env.DB_URI;

if (!dbUri) {
  throw new Error("DB_URI is not defined in the environment variables");
}

connectToDatabase(dbUri);

export const io = new socketIo.Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use("/api", orderRoutes);

io.on("connection", socketHandler);
streamLive();

io.on("updatePollingTime", updateIntervalHandler);

server.listen(PORT, async () => {
  console.log(`Listening on port ${PORT} `);
});
