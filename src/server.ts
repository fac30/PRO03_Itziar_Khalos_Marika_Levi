// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes";

// imports the json file(s) - do this with Marika's data bases
import quizzesJson from "../db/quizzes.json";

import { Quiz } from "./models/quiz.ts";

dotenv.config();

const app: Express = express();
// Use the API routes
app.use("/api", apiRoutes);

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// quizzesJson is the example to test it's working, remember to replace with Marika's data bases
app.get("/quizzes", (req: Request, res: Response) => {
  const allQuizzes = Quiz.createQuizzesFromJSON(quizzesJson);
  res.json(allQuizzes);
});

// post --> read the body from the request > use the date from the request to create a new Quiz object > save that quiz object into the JSON file
// create a method inside the Quizz class, named SAVE, that saves objects in the json file
app.post("/quizzes", (req: Request, res: Response) => {
  res.json("create a new quiz");
});

app.patch("/quizzes", (req: Request, res: Response) => {
  res.json("update one quiz");
});

app.delete("/quizzes", (req: Request, res: Response) => {
  res.json("delete one quiz");
});

app.get("/questions", (req: Request, res: Response) => {
  res.json("retrieve all questions");
});
app.post("/questions", (req: Request, res: Response) => {
  res.json("create a new question");
});
app.patch("/questions", (req: Request, res: Response) => {
  res.json("update one question");
});
app.delete("/questions", (req: Request, res: Response) => {
  res.json("delete one question");
});

app.get("/answers", (req: Request, res: Response) => {
  res.json("retrieve all answers");
});
app.post("/answers", (req: Request, res: Response) => {
  res.json("create a new answer");
});
app.patch("/answers", (req: Request, res: Response) => {
  res.json("update one answer");
});
app.delete("/answers", (req: Request, res: Response) => {
  res.json("delete one answer");
});

app.get("/users", (req: Request, res: Response) => {
  res.json("retrieve all users");
});
app.post("/users", (req: Request, res: Response) => {
  res.json("create a new user");
});
app.patch("/users", (req: Request, res: Response) => {
  res.json("update one users");
});
app.delete("/users", (req: Request, res: Response) => {
  res.json("delete one user");
});

app.get("/results", (req: Request, res: Response) => {
  res.json("retrieve all results");
});
app.post("/results", (req: Request, res: Response) => {
  res.json("create a new result");
});
app.patch("/results", (req: Request, res: Response) => {
  res.json("update one result");
});
app.delete("/results", (req: Request, res: Response) => {
  res.json("delete one result");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
