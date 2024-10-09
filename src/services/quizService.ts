// Imports the JSON file(s) from databases
import quizzesJson from "../../data/quizzes.json";
import questionsJson from "../../data/questions.json";
import answersJson from "../../data/answers.json";
import resultsJson from "../../data/results.json";

interface QuizResult {
  id: number;
  quizId: number;
  userId: number;
  score?: number;
}

function shuffledArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const randomChoice = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomChoice]] = [array[randomChoice], array[i]];
  }
  return array;
}

export function getRandomQuestions(category: string, difficulty: string) {
  const selectedQuiz = quizzesJson.find((quiz) => {
    return (
      quiz.category.toLowerCase() === category.toLowerCase() &&
      quiz.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  });

  if (!selectedQuiz) {
    console.log(
      `No quiz found for category: ${category} and difficulty: ${difficulty}`
    );
    return [];
  }

  const relatedQuestions = questionsJson.filter(
    (question: { quizId: number }) => {
      return question.quizId === selectedQuiz.id;
    }
  );

  const shuffledQuestions = shuffledArray(relatedQuestions);
  return shuffledQuestions;
}

export function displayQuiz(questions: any[]) {
  questions.forEach((q, index) => {
    console.log(`Question ${index + 1}: ${q.text}`);

    const questionOptions = answersJson.filter((answer) => {
      return answer.questionId === q.id;
    });

    if (questionOptions.length > 0) {
      questionOptions.forEach((option, i) => {
        console.log(`Option ${i + 1}: ${option.text}`);
      });
    } else {
      console.log("No options available for this question.");
    }
  });
}

function checkAnswer(
  userAnswer: { questionId: number; answer: string },
  correctAnswer: any
) {
  if (!correctAnswer) {
    console.log(
      `No correct answer found for question ID ${userAnswer.questionId}`
    );
    return false;
  }

  return (
    userAnswer.answer.trim().toLowerCase() ===
    correctAnswer.text.trim().toLowerCase()
  );
}

export function processQuizAnswers(
  userId: number,
  quizId: number,
  userAnswers: { questionId: number; answer: string }[]
) {
  let totalCorrect = 0;

  userAnswers.forEach((userAnswer) => {
    const correctAnswer = answersJson.find(
      (answer) =>
        answer.questionId === userAnswer.questionId && answer.isCorrect
    );
    if (checkAnswer(userAnswer, correctAnswer)) {
      totalCorrect++;
    }
  });

  const totalQuestions = userAnswers.length;
  const scorePercentage = (totalCorrect / totalQuestions) * 100;

  const existingResultIndex = resultsJson.findIndex(
    (result) => result.userId === userId && result.quizId === quizId
  );

  // Prepare the result data object
  const resultData: QuizResult = {
    id: resultsJson.length + 1,
    quizId: quizId,
    userId: userId,
    score: scorePercentage || 0,
  
  };

  if (existingResultIndex !== -1) {
    resultsJson[existingResultIndex] = resultData;
  } else {
    resultsJson.push(resultData);
  }


 resultsJson.forEach(result => {
  result.score = result.score !== undefined ? result.score : 0;  // Default to 0 if score is undefined
});
  writeResults(resultsJson); 

  // Return the result object
  return {
    totalCorrect,
    totalQuestions,
    scorePercentage,
  };
}

import fs from 'fs';
import path from 'path';

function writeResults(results: QuizResult[]): void {
  fs.writeFileSync(
    path.join(__dirname, "../../data/results.json"),
    JSON.stringify(results, null, 2)
  );
}



