import cors from "cors";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/giphyRoutes.ts";

import fs from "fs";
import path from "path";

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
import { all } from "axios";

dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};

const app: Express = express();
app.use(express.json());
app.use("/api", apiRoutes);

const port = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("Wisdom War Server");
});

app.get("/quizzes", (req: Request, res: Response) => {
  const allQuizzes = Quiz.createQuizzesFromJSON(quizzesJson);
  // for each quiz
  // get all questions belonging to that quiz
  // get the length of the questions
  // assign it as property for that quiz
  res.json(allQuizzes);
});

app.post("/quizzes", (req: Request, res: Response) => {
  const { name, description, category, difficulty } = req.body;

  const quizzes = readQuizzes();

  const newQuiz = new Quiz(
    quizzes[quizzes.length - 1].id + 1,
    name,
    description,
    category,
    difficulty
  );

  quizzes.push(newQuiz);

  writeQuizzes(quizzes);

  //status 201 = created
  res.status(201).json(newQuiz);
});

const quizzesFilePath = path.join(__dirname, "../data/quizzes.json");

function readQuizzes(): Quiz[] {
  const data = fs.readFileSync(quizzesFilePath, "utf-8");
  return JSON.parse(data);
}

function writeQuizzes(quizzes: Quiz[]): void {
  fs.writeFileSync(quizzesFilePath, JSON.stringify(quizzes, null, 2));
}

app.patch("/quizzes/:id", (req: Request, res: Response) => {
  const quizId = parseInt(req.params.id);
  const updates = req.body;

  let quizzes = readQuizzes();

  const quizIndex = quizzes.findIndex((quiz) => quiz.id === quizId);

  if (quizIndex === -1) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  const updatedQuiz = { ...quizzes[quizIndex], ...updates };
  quizzes[quizIndex] = updatedQuiz;
  writeQuizzes(quizzes);

  res.json({ message: "Quiz updated successfully", quiz: updatedQuiz });
});

app.delete("/quizzes/:id", (req: Request, res: Response) => {
  const quizId = parseInt(req.params.id);
  let quizzes = readQuizzes();

  const quizIndex = quizzes.findIndex((quiz) => quiz.id === quizId);
  if (quizIndex === -1) {
    return res.status(404).json({ message: "Quiz not found" });
  }
  quizzes.splice(quizIndex, 1);

  writeQuizzes(quizzes);

  // Status code 204: no content
  res.status(204).json();
});

app.get("/questions", (req: Request, res: Response) => {
  const allAnswers = Answer.createAnswersFromJSON(answersJson);
  let allQuestions = Question.createQuestionsFromJSON(questionsJson).map(
    (question) => {
      const questionAnswers = allAnswers
        .filter((answer) => answer.questionId === question.id)
        .map((qa) => {
          delete qa["isCorrect"];
          delete qa["questionId"];
          return qa;
        });
      question["answers"] = questionAnswers;
      return question;
    }
  );

  const quizId = parseInt(req.query.quizId as string);
  if (!quizId) {
    res.json(allQuestions);
  } else {
    const filteredQuestions = allQuestions.filter((e) => e.quizId === quizId);
    res.json(filteredQuestions);
  }
});

app.post("/questions", (req: Request, res: Response) => {
  const { quizId, text, type, points } = req.body;

  const questions = readQuestions();

  const newQuestion = new Question(
    questions[questions.length - 1].id + 1,
    quizId,
    text,
    type,
    points
  );

  questions.push(newQuestion);

  writeQuestions(questions);

  res.status(201).json(newQuestion);
});

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

app.patch("/questions/:id", (req: Request, res: Response) => {
  const questionId = parseInt(req.params.id);
  const updates = req.body;

  let questions = readQuestions();
  const questionIndex = questions.findIndex(
    (question) => question.id === questionId
  );

  if (questionIndex === -1) {
    return res.status(404).json({ message: "Question not found" });
  }

  const updatedQuestion = { ...questions[questionIndex], ...updates };

  questions[questionIndex] = updatedQuestion;

  writeQuestions(questions);

  res.json({
    message: "Question updated successfully",
    question: updatedQuestion,
  });
});

app.delete("/questions/:id", (req: Request, res: Response) => {
  const questionId = parseInt(req.params.id);
  let questions = readQuestions();

  const questionIndex = questions.findIndex(
    (question) => question.id === questionId
  );
  if (questionIndex === -1) {
    return res.status(404).json({ message: "Question not found" });
  }
  questions.splice(questionIndex, 1);

  writeQuestions(questions);

  res.status(204).json();
});

app.get("/answers", (req: Request, res: Response) => {
  const allAnswers = Answer.createAnswersFromJSON(answersJson);
  res.json(allAnswers);
});

app.post("/answers", (req: Request, res: Response) => {
  const { questionId, text, isCorrect } = req.body;

  const answers = readAnswers();

  const newAnswer = new Answer(
    answers[answers.length - 1].id + 1,
    questionId,
    text,
    isCorrect
  );

  answers.push(newAnswer);

  writeAnswers(answers);

  res.status(201).json(newAnswer);
});

const answersFilePath = path.join(__dirname, "../data/answers.json");

function readAnswers(): Answer[] {
  const data = fs.readFileSync(answersFilePath, "utf-8");
  return JSON.parse(data);
}

function writeAnswers(answers: Answer[]): void {
  fs.writeFileSync(answersFilePath, JSON.stringify(answers, null, 2));
}

app.patch("/answers/:id", (req: Request, res: Response) => {
  const answerId = parseInt(req.params.id);
  const updates = req.body;

  let answers = readAnswers();

  const answerIndex = answers.findIndex((answer) => answer.id === answerId);

  if (answerIndex === -1) {
    return res.status(404).json({ message: "Answer not found" });
  }

  const updatedAnswer = { ...answers[answerIndex], ...updates };
  answers[answerIndex] = updatedAnswer;
  writeAnswers(answers);

  res.json({ message: "Answers updated successfully", answers: updatedAnswer });
});

app.delete("/answers/:id", (req: Request, res: Response) => {
  const answerId = parseInt(req.params.id);
  let answers = readAnswers();

  const answerIndex = answers.findIndex((answer) => answer.id === answerId);
  if (answerIndex === -1) {
    return res.status(404).json({ message: "Answer not found" });
  }
  answers.splice(answerIndex, 1);

  writeAnswers(answers);

  res.status(204).json();
});

app.get("/users", (req: Request, res: Response) => {
  const allUsers = User.createUsersFromJSON(usersJson);
  res.json(allUsers);
});

app.post("/users", (req: Request, res: Response) => {
  const { name, points } = req.body;

  const users = readUsers();

  const newUsers = new User(users[users.length - 1].id + 1, name, points);

  users.push(newUsers);

  writeUsers(users);

  res.status(201).json(newUsers);
});

const usersFilePath = path.join(__dirname, "../data/users.json");

function readUsers(): User[] {
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data);
}

function writeUsers(users: User[]): void {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

app.patch("/users/:id", (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const updates = req.body;
  let users = readUsers();
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const updatedUser = { ...users[userIndex], ...updates };
  users[userIndex] = updatedUser;
  writeUsers(users);

  res.json({ message: "Users updated successfully", users: updatedUser });
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  let users = readUsers();

  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users.splice(userIndex, 1);

  writeUsers(users);

  res.status(204).json();
});

app.get("/results", (req: Request, res: Response) => {
  const allResults = Result.createResultsFromJSON(resultsJson);
  res.json(allResults);
});

app.post("/results", (req: Request, res: Response) => {
  const allAnswers = Answer.createAnswersFromJSON(answersJson);

  let score = 0;
  for (const [questionId, answerId] of Object.entries(req.body.results)) {
    const correctAnswer = allAnswers.find(
      (answer) => answer.questionId === parseInt(questionId) && answer.isCorrect
    );
    if (correctAnswer?.id === answerId) {
      score++;
    }
  }

  const results = readResults();
  const newResults = new Result(
    results[results.length - 1].id + 1,
    req.body.quizId,
    0,
    score,
    req.body.totalQuestions
  );

  results.push(newResults);

  writeResults(results);

  res.status(201).json(newResults);
});

const resultsFilePath = path.join(__dirname, "../data/results.json");

function readResults(): Result[] {
  const data = fs.readFileSync(resultsFilePath, "utf-8");
  return JSON.parse(data);
}

function writeResults(results: Result[]): void {
  fs.writeFileSync(resultsFilePath, JSON.stringify(results, null, 2));
}

app.get("/results/:id", (req: Request, res: Response) => {
  const resultId = parseInt(req.params.id);

  let results = readResults();
  const result = results.find((result) => result.id === resultId);
  res.json(result);
});

app.patch("/results/:id", (req: Request, res: Response) => {
  const resultId = parseInt(req.params.id);
  const updates = req.body;
  let results = readResults();
  const resultIndex = results.findIndex((result) => result.id === resultId);

  if (resultIndex === -1) {
    return res.status(404).json({ message: "Result not found" });
  }

  const updatedResult = { ...results[resultIndex], ...updates };
  results[resultIndex] = updatedResult;
  writeResults(results);

  res.json({ message: "Results updated successfully", results: updatedResult });
});

app.delete("/results/:id", (req: Request, res: Response) => {
  const resultId = parseInt(req.params.id);
  let results = readResults();

  const resultIndex = results.findIndex((result) => result.id === resultId);
  if (resultIndex === -1) {
    return res.status(404).json({ message: "Result not found" });
  }
  results.splice(resultIndex, 1);

  writeResults(results);

  res.status(204).json();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
