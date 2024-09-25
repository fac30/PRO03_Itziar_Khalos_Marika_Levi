// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes.ts";
import fs from "fs";
import path from "path";

// imports the json file(s) - do this with Marika's data bases
import quizzesJson from "../data/quizzes.json";
import answersJson from "../data/answers.json";
import questionsJson from "../data/questions.json";
import resultJson from "../data/results.json";
import usersJson from "../data/users.json";

import { Answer } from "./models/answer.ts";
import { Question } from "./models/question.ts";
import { Quiz } from "./models/quiz.ts";
import { Result } from "./models/result.ts";
import { User } from "./models/user.ts";
import { error } from "console";

dotenv.config();

const app: Express = express();
// Use the API routes
app.use("/api", apiRoutes);

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Middleware to parse JSON bodies. It makes the parsed data available on req.body.
app.use(express.json());

// quizzesJson is the example to test it's working, remember to replace with Marika's data bases
app.get("/quizzes", (req: Request, res: Response) => {
  const allQuizzes = Quiz.createQuizzesFromJSON(quizzesJson);
  res.json(allQuizzes);
});

// The below are the endopoints, we have to update them with the functions we will create inside the classes

// post --> read the body from the request > use the date from the request to create a new Quiz object > save that quiz object into the JSON file
// create a method inside the Quizz class, named SAVE, that saves objects in the json file
app.post("/quizzes", (req: Request, res: Response) => {
  // Define the path to your JSON file
  const quizzesFilePath = path.join(__dirname, "quizzes.json");

    // Create a new Quiz instance from the request body
    const newQuiz = new Quiz(
      req.body.id,
      req.body.name,
      req.body.description,
      req.body.category,
      req.body.difficulty,
      req.body.numberOfQuestions,
    );


    // Save the new quiz
    newQuiz.save(quizzesFilePath, (err: NodeJS.ErrnoException | null) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving the answer data' });
      }

      // Send a response indicating success
    res.status(201).json(newQuiz);
    });
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
  // Define the path to your JSON file
  const questionsFilePath = path.join(__dirname, "questions.json");

  // Create a new Question instance from the request body
  const newQuestion = new Question(
    req.body.id,
    req.body.quizId,
    req.body.text,
    req.body.type,
    req.body.points
  );

  // Save the new question
  newQuestion.save(questionsFilePath, (err: NodeJS.ErrnoException | null) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving the question data' });
    }
    // Send a response indicating success
    res.status(201).json(newQuestion);
  });
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
  // Define the path to your JSON file
  const answersFilePath = path.join(__dirname, "answers.json");

  // Read the answers.json file
  fs.readFile(answersFilePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading the answer data' });
    }

    // Parse the file data into an array of Answer objects
    const answers: Answer[] = JSON.parse(data);

    // Create a new Answer instance from the request body
    const newAnswer = new Answer(
      req.body.id,
      req.body.questionId,
      req.body.text,
      req.body.isCorrect
    );

    // Add the new answer to the array
    answers.push(newAnswer);

    // Write the updated array back to the JSON file
    fs.writeFile(answersFilePath, JSON.stringify(answers, null, 2), (err: NodeJS.ErrnoException | null) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving the answer data' });
      }

      // Send the updated list of answers as the response
      res.status(201).json(answers);
    });
  });
  


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
  // Define the path to your JSON file
  const usersFilePath = path.join(__dirname, "users.json");

  // Create a new User instance from the request body
  const newUser = new User(
    req.body.id,
    req.body.name,
    req.body.points
  );

  // Save the new user
  newUser.save(usersFilePath, (err: NodeJS.ErrnoException | null) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving the user data' });
    }
    // Send a response indicating success
    res.status(201).json(newUser);
  });
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
  // Define the path to your JSON file
  const resultFilePath = path.join(__dirname, "result.json");

  // Create a new User instance from the request body
  const newResult = new Result(
    req.body.id,
    req.body.quizId,
    req.body.userId,
    req.body.score,
  );

  // Save the new user
  newResult.save(resultFilePath, (err: NodeJS.ErrnoException | null) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving the user data' });
    }
    // Send a response indicating success
    res.status(201).json(newResult);
  });
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
