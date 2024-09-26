import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

class Question {
  id: number;
  quizId: number;
  text: string;
  type: string;
  points: number;

  constructor(
    id: number,
    quizId: number,
    text: string,
    type: string,
    points: number
  ) {
    this.id = id;
    this.quizId = quizId;
    this.text = text;
    this.type = type;
    this.points = points;
  }

  // Method to save a question to the JSON file
  save(questionsFilePath: string, callback: (err: NodeJS.ErrnoException | null) => Response | undefined): void {
    // Ensure the directory exists
    const dir = path.dirname(questionsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Ensure the file exists
    if (!fs.existsSync(questionsFilePath)) {
      fs.writeFileSync(questionsFilePath, '[]');
    }

    // Read the existing questions from the JSON file
    fs.readFile(questionsFilePath, 'utf8', (err, data: string) => {
      if (err) {
        return callback(err);
      }

      // Parse the JSON data
      const questions: Question[] = JSON.parse(data);

      // Add the new question to the list
      questions.push(this);

      // Write the updated questions array back to the file
      fs.writeFile(questionsFilePath, JSON.stringify(questions, null, 2), callback);
    });
  }

  // Simulate the POST request using console.log
  static postQuestion(quizId: number, questionText: string, questionType: string, points: number): void {
    // Simulate logging the POST request
    console.log(`[server]: Received POST request to /quizzes/${quizId}/questions`);
    console.log(`[server]: Question submitted:`);
    console.log(`    text: ${questionText}`);
    console.log(`    type: ${questionType}`);
    console.log(`    points: ${points}`);
  }
}

export { Question };

