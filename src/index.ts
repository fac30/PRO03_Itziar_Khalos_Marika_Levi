// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes";
// fs is used to read from and write to JSON files, like quiz.json or questions.json.
import fs from "fs";
// The path module resolves paths to the JSON files you're interacting with (e.g., quiz.json, questions.json).
import path from "path";
// imports the json file(s) - do this with Marika's data bases
import quizzesJson from "../data/quizzes.json";
import answersJson from "../data/answers.json";
import questionsJson from "../data/questions.json";
import resultsJson from "../data/results.json";
import usersJson from "../data/users.json";

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
  res.send("Wisdom War Server");
});

app.get("/quizzes", (req: Request, res: Response) => {
  const allQuizzes = Quiz.createQuizzesFromJSON(quizzesJson);
  res.json(allQuizzes);
});

// curl -X GET http://localhost:3000/quizzes | jq .

app.post("/quizzes", (req: Request, res: Response) => {
  const { name, description, category, difficulty, numberOfQuestions } =
    req.body;

  const quizzes = readQuizzes();

  const newQuiz = new Quiz(
    quizzes[quizzes.length - 1].id + 1,
    name,
    description,
    category,
    difficulty,
    numberOfQuestions
  );

  quizzes.push(newQuiz);

  writeQuizzes(quizzes);

  res.status(201).json(newQuiz);
});

// PATCH code for Quiz: 2 helper functions and endpoints:
const quizzesFilePath = path.join(__dirname, "../data/quizzes.json");
// Helper function 1: to read quizzes from the JSON file
function readQuizzes(): Quiz[] {
  const data = fs.readFileSync(quizzesFilePath, "utf-8");
  return JSON.parse(data);
}

// Helper function 2: to write quizzes to the JSON file
function writeQuizzes(quizzes: Quiz[]): void {
  fs.writeFileSync(quizzesFilePath, JSON.stringify(quizzes, null, 2));
}

// PATCH endpoint to update a quiz partially
app.patch("/quizzes/:id", (req: Request, res: Response) => {
  const quizId = parseInt(req.params.id);
  const updates = req.body;

  // Read existing quizzes
  let quizzes = readQuizzes();

  // Find the quiz by ID
  const quizIndex = quizzes.findIndex((quiz) => quiz.id === quizId);

  if (quizIndex === -1) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  // Update only the provided fields in the quiz
  const updatedQuiz = { ...quizzes[quizIndex], ...updates };

  // Replace the old quiz with the updated one
  quizzes[quizIndex] = updatedQuiz;

  // Save the updated quizzes array back to the JSON file
  writeQuizzes(quizzes);

  res.json({ message: "Quiz updated successfully", quiz: updatedQuiz });
});

//DELETE the quiz
app.delete("/quizzes/:id", (req: Request, res: Response) => {
  const quizId = parseInt(req.params.id);
  let quizzes = readQuizzes();

  const quizIndex = quizzes.findIndex((quiz) => quiz.id === quizId);
  if (quizIndex === -1) {
    return res.status(404).json({ message: "Quiz not found" });
  }
  quizzes.splice(quizIndex, 1);

  writeQuizzes(quizzes);

  // Status code 204: no content --> expected when deleting something
  res.status(204).json();
});

app.get("/questions", (req: Request, res: Response) => {
  const allQuestions = Question.createQuestionsFromJSON(questionsJson);
  res.json(allQuestions);
});
app.post("/questions", (req: Request, res: Response) => {
  res.json("create a new question");
});

// PATCH code for Questions: 2 helper functions and endpoints:
const questionsFilePath = path.join(__dirname, "../data/questions.json");
// Helper function 1: to read questions from the JSON file
function readQuestions(): Question[] {
  const data = fs.readFileSync(questionsFilePath, "utf-8");
  return JSON.parse(data);
}
// Helper function 2: to write questions to the JSON file
function writeQuestions(questions: Question[]): void {
  fs.writeFileSync(questionsFilePath, JSON.stringify(questions, null, 2));
}
// PATCH endpoint to update questions
app.patch("/questions/:id", (req: Request, res: Response) => {
  const questionId = parseInt(req.params.id);
  const updates = req.body;
  // Read existing questions
  let questions = readQuestions();
  // Find the questions by ID
  const questionIndex = questions.findIndex(
    (question) => question.id === questionId
  );

  if (questionIndex === -1) {
    return res.status(404).json({ message: "Question not found" });
  }
  // Update only the provided fields in the questions
  const updatedQuestion = { ...questions[questionIndex], ...updates };
  // Replace the old questions with the updated one
  questions[questionIndex] = updatedQuestion;
  // Save the updated questions array back to the JSON file
  writeQuestions(questions);

  res.json({
    message: "Question updated successfully",
    question: updatedQuestion,
  });
});

app.delete("/questions", (req: Request, res: Response) => {
  res.json("delete one question");
});

app.get("/answers", (req: Request, res: Response) => {
  const allAnswers = Answer.createAnswersFromJSON(answersJson);
  res.json(allAnswers);
});
app.post("/answers", (req: Request, res: Response) => {
  res.json("create a new answer");
});

// PATCH code for Answer: 2 helper functions and endpoints:
const answersFilePath = path.join(__dirname, "../data/answers.json");
// Helper function 1: to read answers from the JSON file
function readAnswers(): Answer[] {
  const data = fs.readFileSync(answersFilePath, "utf-8");
  return JSON.parse(data);
}
// Helper function 2: to write answers to the JSON file
function writeAnswers(answers: Answer[]): void {
  fs.writeFileSync(answersFilePath, JSON.stringify(answers, null, 2));
}
// PATCH endpoint to update answers
app.patch("/answers/:id", (req: Request, res: Response) => {
  const answerId = parseInt(req.params.id);
  const updates = req.body;
  // Read existing answers
  let answers = readAnswers();
  // Find the answers by ID
  const answerIndex = answers.findIndex((answer) => answer.id === answerId);

  if (answerIndex === -1) {
    return res.status(404).json({ message: "Answer not found" });
  }
  // Update only the provided fields in the answers
  const updatedAnswer = { ...answers[answerIndex], ...updates };
  // Replace the old answers with the updated one
  answers[answerIndex] = updatedAnswer;
  // Save the updated answers array back to the JSON file
  writeAnswers(answers);

  res.json({ message: "Answers updated successfully", answers: updatedAnswer });
});

app.delete("/answers", (req: Request, res: Response) => {
  res.json("delete one answer");
});

app.get("/users", (req: Request, res: Response) => {
  const allUsers = User.createUsersFromJSON(usersJson);
  res.json(allUsers);
});
app.post("/users", (req: Request, res: Response) => {
  res.json("create a new user");
});

// PATCH code for User: 2 helper functions and endpoints:
const usersFilePath = path.join(__dirname, "../data/users.json");
// Helper function 1: to read users from the JSON file
function readUsers(): User[] {
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data);
}
// Helper function 2: to write user to the JSON file
function writeUsers(users: User[]): void {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}
// PATCH endpoint to update users
app.patch("/users/:id", (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const updates = req.body;
  // Read existing users
  let users = readUsers();
  // Find the users by ID
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  // Update only the provided fields in the users
  const updatedUser = { ...users[userIndex], ...updates };
  // Replace the old users with the updated one
  users[userIndex] = updatedUser;
  // Save the updated user array back to the JSON file
  writeUsers(users);

  res.json({ message: "Users updated successfully", users: updatedUser });
});

app.delete("/users", (req: Request, res: Response) => {
  res.json("delete one user");
});

app.get("/results", (req: Request, res: Response) => {
  const allResults = Result.createResultsFromJSON(resultsJson);
  res.json(allResults);
});
app.post("/results", (req: Request, res: Response) => {
  res.json("create a new result");
});

// PATCH code for Results: 2 helper functions and endpoints:
const resultsFilePath = path.join(__dirname, "../data/results.json");
// Helper function 1: to read results from the JSON file
function readResults(): Result[] {
  const data = fs.readFileSync(resultsFilePath, "utf-8");
  return JSON.parse(data);
}
// Helper function 2: to write results to the JSON file
function writeResults(results: Result[]): void {
  fs.writeFileSync(resultsFilePath, JSON.stringify(results, null, 2));
}
// PATCH endpoint to update results
app.patch("/results/:id", (req: Request, res: Response) => {
  const resultId = parseInt(req.params.id);
  const updates = req.body;
  // Read existing results
  let results = readResults();
  // Find the results by ID
  const resultIndex = results.findIndex((result) => result.id === resultId);

  if (resultIndex === -1) {
    return res.status(404).json({ message: "Result not found" });
  }
  // Update only the provided fields in the results
  const updatedResult = { ...results[resultIndex], ...updates };
  // Replace the old reults with the updated one
  results[resultIndex] = updatedResult;
  // Save the updated results array back to the JSON file
  writeResults(results);

  res.json({ message: "Results updated successfully", results: updatedResult });
});

app.delete("/results", (req: Request, res: Response) => {
  res.json("delete one result");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
