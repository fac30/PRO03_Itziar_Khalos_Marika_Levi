import fs from 'fs';
import path from 'path';
import { Quiz } from '../models/quiz';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { Result } from '../models/result';  // Import the Result model
import { User } from '../models/user';      // Import User to associate results with users
import { QuizWithQuestions } from '../models/quizWithQuestions';

// Paths to the data files
const quizzesFilePath = path.join(__dirname, '../../data/quiz.json');
const questionsFilePath = path.join(__dirname, '../../data/questions.json');
const answersFilePath = path.join(__dirname, '../../data/answers.json');
const resultsFilePath = path.join(__dirname, '../../data/results.json');
const usersFilePath = path.join(__dirname, '../../data/users.json');

// Utility function to read data from a JSON file
const readDataFromFile = (filePath: string) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Utility function to write data to a JSON file
const writeDataToFile = (filePath: string, data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Utility function to filter questions by quizId
const getQuestionsForQuiz = (quizId: number): Question[] => {
  const questionsData: Question[] = readDataFromFile(questionsFilePath);
  return questionsData.filter((question) => question.quizId === quizId);
};

// Utility function to get answers for a specific question
const getAnswersForQuestion = (questionId: number): Answer[] => {
  const answersData: Answer[] = readDataFromFile(answersFilePath);
  return answersData.filter((answer) => answer.questionId === questionId);
};

// Core function to generate a quiz with questions and answers
export const generateQuizWithQuestions = (quizId: number): QuizWithQuestions | null => {
  const quizzes: Quiz[] = readDataFromFile(quizzesFilePath);
  const selectedQuiz = quizzes.find((quiz) => quiz.id === quizId);

  if (!selectedQuiz) {
    return null;
  }

  const questionsForQuiz = getQuestionsForQuiz(quizId);
  const questionsWithAnswers = questionsForQuiz.map((question) => {
    const answers = getAnswersForQuestion(question.id);
    return {
      ...question,
      answers,
    };
  });

  const quizWithQuestions: QuizWithQuestions = {
    ...selectedQuiz,
    questions: questionsWithAnswers,
  };

  return quizWithQuestions;
};

// Function to submit and store a user's result
export const submitResult = (quizId: number, userId: number, score: number): Result => {
  const results: Result[] = readDataFromFile(resultsFilePath);

  const newResult = new Result(results.length + 1, quizId, userId, score);
  results.push(newResult);

  writeDataToFile(resultsFilePath, results);
  return newResult;
};

// Function to calculate a user's score based on answers
export const calculateScore = (quizId: number, userAnswers: { questionId: number; selectedAnswerId: number }[]): number => {
  let score = 0;
  const questions = getQuestionsForQuiz(quizId);

  userAnswers.forEach((userAnswer) => {
    const question = questions.find(q => q.id === userAnswer.questionId);
    if (question) {
      const correctAnswer = getAnswersForQuestion(question.id).find(answer => answer.isCorrect);
      if (correctAnswer && correctAnswer.id === userAnswer.selectedAnswerId) {
        score += question.points;
      }
    }
  });

  return score;
};

// Function to generate a leaderboard (top users by score)
export const getLeaderboard = (): { userId: number, score: number, userName: string }[] => {
  const results: Result[] = readDataFromFile(resultsFilePath);
  const users: User[] = readDataFromFile(usersFilePath);

  // Aggregate scores by user
  const leaderboard = results.reduce((acc: { userId: number; score: number; }[], result) => {
    const existingEntry = acc.find((entry) => entry.userId === result.userId);
    if (existingEntry) {
      existingEntry.score += result.score;
    } else {
      acc.push({ userId: result.userId, score: result.score });
    }
    return acc;
  }, []);

  // Sort by score in descending order
  leaderboard.sort((a, b) => b.score - a.score);

  // Map leaderboard entries with user names
  return leaderboard.map(entry => {
    const user = users.find(u => u.id === entry.userId);
    return {
      userId: entry.userId,
      score: entry.score,
      userName: user ? user.name : 'Unknown'
    };
  });
};
