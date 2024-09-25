// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes";
// fs is used to read from and write to JSON files, like quiz.json or questions.json.
import fs from 'fs';
// The path module resolves paths to the JSON files you're interacting with (e.g., quiz.json, questions.json).
import path from 'path';

// imports the json file(s) - do this with Marika's data bases
import quizzesJson from "../data/quizzes.json";

import { Answer } from "./models/answer.ts";
import { Question } from "./models/question.ts";
import { Quiz } from "./models/quiz.ts";
import { Result } from "./models/result.ts";
import { User } from "./models/user.ts";

dotenv.config();

const app: Express = express();
// Configuring the Express application to automatically parse incoming JSON payloads from the request body.
app.use(express.json());
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

// PATCH code for Quiz: 2 helper functions and endpoints:
const quizzesFilePath = path.join(__dirname, '../data/quiz.json');
// Helper function 1: to read quizzes from the JSON file
function readQuizzes(): Quiz[] {
  const data = fs.readFileSync(quizzesFilePath, 'utf-8');
  return JSON.parse(data);
}

// Helper function 2: to write quizzes to the JSON file
function writeQuizzes(quizzes: Quiz[]): void {
  fs.writeFileSync(quizzesFilePath, JSON.stringify(quizzes, null, 2));
}

// PATCH endpoint to update a quiz partially
app.patch('/quizzes/:id', (req: Request, res: Response) => {
  const quizId = parseInt(req.params.id);
  const updates = req.body;

  // Read existing quizzes
  let quizzes = readQuizzes();

  // Find the quiz by ID
  const quizIndex = quizzes.findIndex((quiz) => quiz.id === quizId);

  if (quizIndex === -1) {
    return res.status(404).json({ message: 'Quiz not found' });
  }

  // Update only the provided fields in the quiz
  const updatedQuiz = { ...quizzes[quizIndex], ...updates };
  
  // Replace the old quiz with the updated one
  quizzes[quizIndex] = updatedQuiz;

  // Save the updated quizzes array back to the JSON file
  writeQuizzes(quizzes);

  res.json({ message: 'Quiz updated successfully', quiz: updatedQuiz });
});

// PATCH code for Questions: 2 helper functions and endpoints:
const questionsFilePath = path.join(__dirname, '../data/questions.json');
// Helper function 1: to read questions from the JSON file
function readQuestions(): Question[] {
  const data = fs.readFileSync(questionsFilePath, 'utf-8');
  return JSON.parse(data);
}
// Helper function 2: to write questions to the JSON file
function writeQuestions(questions: Question[]): void {
  fs.writeFileSync(questionsFilePath, JSON.stringify(questions, null, 2));
}
// PATCH endpoint to update questions
app.patch('/questions/:id', (req: Request, res: Response) => {
  const questionId = parseInt(req.params.id);
  const updates = req.body;

  let questions = readQuestions();

  const questionIndex = questions.findIndex((question) => question.id === questionId);

  if (questionIndex === -1) {
    return res.status(404).json({ message: 'Question not found' });
  }

  const updatedQuestion = { ...questions[questionIndex], ...updates };
  questions[questionIndex] = updatedQuestion;

  writeQuestions(questions);

  res.json({ message: 'Question updated successfully', question: updatedQuestion });
});

// The below are the endopoints, we have to update them with the functions we will create inside the classes

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
