import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const bodyParser = require('body-parser');


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cors({ origin: "http://localhost:3001" }));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
