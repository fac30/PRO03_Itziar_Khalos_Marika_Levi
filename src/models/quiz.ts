import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

class Quiz {
  id: number;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  numberOfQuestions: number;

  constructor(
    id: number,
    name: string,
    description: string,
    category: string,
    difficulty: string,
    numberOfQuestions: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.difficulty = difficulty;
    this.numberOfQuestions = numberOfQuestions;
  }

  // Method to save a quiz to the JSON file
  save(quizzesFilePath: string, callback: (err: NodeJS.ErrnoException | null) => Response | undefined): void {
    // Ensure the directory exists
    const dir = path.dirname(quizzesFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Ensure the file exists
    if (!fs.existsSync(quizzesFilePath)) {
      fs.writeFileSync(quizzesFilePath, '[]');
    }

    // Read the existing quizzes from the JSON file
    fs.readFile(quizzesFilePath, 'utf8', (err, data: string) => {
      if (err) {
        return callback(err);
      }

      // Parse the JSON data
      const quizzes: Quiz[] = JSON.parse(data);

      // Add the new quiz to the list
      quizzes.push(this);

      // Write the updated quizzes array back to the file
      fs.writeFile(quizzesFilePath, JSON.stringify(quizzes, null, 2), callback);
    });
  }

  // Static method to create quizzes from JSON data
  static createQuizzesFromJSON(jsonData: any[]): Quiz[] {
    const quizzesList: Quiz[] = [];
    for (const quiz of jsonData) {
      quizzesList.push(
        new Quiz(
          quiz.id,
          quiz.name,
          quiz.description,
          quiz.category,
          quiz.difficulty,
          quiz.numberOfQuestions
        )
      );
    }
    return quizzesList;
  }

  // Simulate the POST request using console.log
  static postQuiz(
    quizName: string, 
    quizDescription: string, 
    quizCategory: string, 
    quizDifficulty: string, 
    numberOfQuestions: number
  ): void {
    // Simulate logging the POST request
    console.log(`[server]: Received POST request to /quizzes/${quizName}/quizs`);
    console.log(`[server]: Quiz submitted:`);
    console.log(`    description: ${quizDescription}`);
    console.log(`    category: ${quizCategory}`);
    console.log(`    difficulty: ${quizDifficulty}`);
    console.log(`    numberOfQuestions: ${numberOfQuestions}`);
  }
}

export { Quiz };

