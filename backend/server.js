import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./lib/db.js";

import superheroRoutes from "./routes/superhero.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "20mb" }));

app.use("/api/superheroes", superheroRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDB();
});
