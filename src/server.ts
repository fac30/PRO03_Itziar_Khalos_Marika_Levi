// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes";

dotenv.config();

const app: Express = express();
// Use the API routes
app.use("/api", apiRoutes);

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
