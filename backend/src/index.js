import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

import { db } from "./utils/db.js";

import Routes from "./routes/api.js";

dotenv.config();

const app = express();
const PORT = 3001

app.use(cors());

db();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api", Routes);

app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
});

