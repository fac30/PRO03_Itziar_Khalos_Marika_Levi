"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
// fs is used to read from and write to JSON files, like quiz.json or questions.json.
const fs_1 = __importDefault(require("fs"));
// The path module resolves paths to the JSON files you're interacting with (e.g., quiz.json, questions.json).
const path_1 = __importDefault(require("path"));
// imports the json file(s) - do this with Marika's data bases
const quizzes_json_1 = __importDefault(require("../data/quizzes.json"));
const answers_json_1 = __importDefault(require("../data/answers.json"));
const questions_json_1 = __importDefault(require("../data/questions.json"));
const results_json_1 = __importDefault(require("../data/results.json"));
const users_json_1 = __importDefault(require("../data/users.json"));
const answer_ts_1 = require("./models/answer.ts");
const question_ts_1 = require("./models/question.ts");
const quiz_ts_1 = require("./models/quiz.ts");
const result_ts_1 = require("./models/result.ts");
const user_ts_1 = require("./models/user.ts");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configuring the Express application to automatically parse incoming JSON payloads from the request body.
app.use(express_1.default.json());
// Use the API routes
app.use("/api", apiRoutes_1.default);
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Wisdom War Server");
});
app.get("/quizzes", (req, res) => {
    const allQuizzes = quiz_ts_1.Quiz.createQuizzesFromJSON(quizzes_json_1.default);
    res.json(allQuizzes);
});
// The below are the endopoints, we have to update them with the functions we will create inside the classes
// post --> read the body from the request > use the date from the request to create a new Quiz object > save that quiz object into the JSON file
// create a method inside the Quizz class, named SAVE, that saves objects in the json file
app.post("/quizzes", (req, res) => {
    res.json("create a new quiz");
});
// PATCH code for Quiz: 2 helper functions and endpoints:
const quizzesFilePath = path_1.default.join(__dirname, '../data/quiz.json');
// Helper function 1: to read quizzes from the JSON file
function readQuizzes() {
    const data = fs_1.default.readFileSync(quizzesFilePath, 'utf-8');
    return JSON.parse(data);
}
// Helper function 2: to write quizzes to the JSON file
function writeQuizzes(quizzes) {
    fs_1.default.writeFileSync(quizzesFilePath, JSON.stringify(quizzes, null, 2));
}
// PATCH endpoint to update a quiz partially
app.patch('/quizzes/:id', (req, res) => {
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
    const updatedQuiz = Object.assign(Object.assign({}, quizzes[quizIndex]), updates);
    // Replace the old quiz with the updated one
    quizzes[quizIndex] = updatedQuiz;
    // Save the updated quizzes array back to the JSON file
    writeQuizzes(quizzes);
    res.json({ message: 'Quiz updated successfully', quiz: updatedQuiz });
});
app.delete("/quizzes", (req, res) => {
    res.json("delete one quiz");
});
app.get("/questions", (req, res) => {
    const allQuestions = question_ts_1.Question.createQuestionsFromJSON(questions_json_1.default);
    res.json(allQuestions);
});
app.post("/questions", (req, res) => {
    res.json("create a new question");
});
// PATCH code for Questions: 2 helper functions and endpoints:
const questionsFilePath = path_1.default.join(__dirname, '../data/questions.json');
// Helper function 1: to read questions from the JSON file
function readQuestions() {
    const data = fs_1.default.readFileSync(questionsFilePath, 'utf-8');
    return JSON.parse(data);
}
// Helper function 2: to write questions to the JSON file
function writeQuestions(questions) {
    fs_1.default.writeFileSync(questionsFilePath, JSON.stringify(questions, null, 2));
}
// PATCH endpoint to update questions
app.patch('/questions/:id', (req, res) => {
    const questionId = parseInt(req.params.id);
    const updates = req.body;
    // Read existing questions
    let questions = readQuestions();
    // Find the questions by ID
    const questionIndex = questions.findIndex((question) => question.id === questionId);
    if (questionIndex === -1) {
        return res.status(404).json({ message: 'Question not found' });
    }
    // Update only the provided fields in the questions
    const updatedQuestion = Object.assign(Object.assign({}, questions[questionIndex]), updates);
    // Replace the old questions with the updated one
    questions[questionIndex] = updatedQuestion;
    // Save the updated questions array back to the JSON file
    writeQuestions(questions);
    res.json({ message: 'Question updated successfully', question: updatedQuestion });
});
app.delete("/questions", (req, res) => {
    res.json("delete one question");
});
app.get("/answers", (req, res) => {
    const allAnswers = answer_ts_1.Answer.createAnswersFromJSON(answers_json_1.default);
    res.json(allAnswers);
});
app.post("/answers", (req, res) => {
    res.json("create a new answer");
});
// PATCH code for Answer: 2 helper functions and endpoints:
const answersFilePath = path_1.default.join(__dirname, '../data/answers.json');
// Helper function 1: to read answers from the JSON file
function readAnswers() {
    const data = fs_1.default.readFileSync(answersFilePath, 'utf-8');
    return JSON.parse(data);
}
// Helper function 2: to write answers to the JSON file
function writeAnswers(answers) {
    fs_1.default.writeFileSync(answersFilePath, JSON.stringify(answers, null, 2));
}
// PATCH endpoint to update answers
app.patch('/answers/:id', (req, res) => {
    const answerId = parseInt(req.params.id);
    const updates = req.body;
    // Read existing answers
    let answers = readAnswers();
    // Find the answers by ID
    const answerIndex = answers.findIndex((answer) => answer.id === answerId);
    if (answerIndex === -1) {
        return res.status(404).json({ message: 'Answer not found' });
    }
    // Update only the provided fields in the answers
    const updatedAnswer = Object.assign(Object.assign({}, answers[answerIndex]), updates);
    // Replace the old answers with the updated one
    answers[answerIndex] = updatedAnswer;
    // Save the updated answers array back to the JSON file
    writeAnswers(answers);
    res.json({ message: 'Answers updated successfully', answers: updatedAnswer });
});
app.delete("/answers", (req, res) => {
    res.json("delete one answer");
});
app.get("/users", (req, res) => {
    const allUsers = user_ts_1.User.createUsersFromJSON(users_json_1.default);
    res.json(allUsers);
});
app.post("/users", (req, res) => {
    res.json("create a new user");
});
// PATCH code for User: 2 helper functions and endpoints:
const usersFilePath = path_1.default.join(__dirname, '../data/users.json');
// Helper function 1: to read users from the JSON file
function readUsers() {
    const data = fs_1.default.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
}
// Helper function 2: to write user to the JSON file
function writeUsers(users) {
    fs_1.default.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}
// PATCH endpoint to update users
app.patch('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updates = req.body;
    // Read existing users
    let users = readUsers();
    // Find the users by ID
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Update only the provided fields in the users
    const updatedUser = Object.assign(Object.assign({}, users[userIndex]), updates);
    // Replace the old users with the updated one
    users[userIndex] = updatedUser;
    // Save the updated user array back to the JSON file
    writeUsers(users);
    res.json({ message: 'Users updated successfully', users: updatedUser });
});
app.delete("/users", (req, res) => {
    res.json("delete one user");
});
app.get("/results", (req, res) => {
    const allResults = result_ts_1.Result.createResultsFromJSON(results_json_1.default);
    res.json(allResults);
});
app.post("/results", (req, res) => {
    res.json("create a new result");
});
// PATCH code for Results: 2 helper functions and endpoints:
const resultsFilePath = path_1.default.join(__dirname, '../data/results.json');
// Helper function 1: to read results from the JSON file
function readResults() {
    const data = fs_1.default.readFileSync(resultsFilePath, 'utf-8');
    return JSON.parse(data);
}
// Helper function 2: to write results to the JSON file
function writeResults(results) {
    fs_1.default.writeFileSync(resultsFilePath, JSON.stringify(results, null, 2));
}
// PATCH endpoint to update results
app.patch('/results/:id', (req, res) => {
    const resultId = parseInt(req.params.id);
    const updates = req.body;
    // Read existing results
    let results = readResults();
    // Find the results by ID
    const resultIndex = results.findIndex((result) => result.id === resultId);
    if (resultIndex === -1) {
        return res.status(404).json({ message: 'Result not found' });
    }
    // Update only the provided fields in the results
    const updatedResult = Object.assign(Object.assign({}, results[resultIndex]), updates);
    // Replace the old reults with the updated one
    results[resultIndex] = updatedResult;
    // Save the updated results array back to the JSON file
    writeResults(results);
    res.json({ message: 'Results updated successfully', results: updatedResult });
});
app.delete("/results", (req, res) => {
    res.json("delete one result");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
