import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

class Result {
  id: number;
  quizId: number;
  userId: number;
  score: number;

  constructor(id: number, quizId: number, userId: number, score: number) {
    this.id = id;
    this.quizId = quizId;
    this.userId = userId;
    this.score = score;
  }

  // Method to save a result to the JSON file
  save(resultFilePath: string, callback: (err: NodeJS.ErrnoException | null) => Response | undefined): void {
    // Ensure the directory exists
    const dir = path.dirname(resultFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Ensure the file exists
    if (!fs.existsSync(resultFilePath)) {
      fs.writeFileSync(resultFilePath, '[]');
    }

    // Read the existing results from the JSON file
    fs.readFile(resultFilePath, 'utf8', (err, data: string) => {
      if (err) {
        return callback(err);
      }

      // Parse the JSON data
      const results: Result[] = JSON.parse(data);

      // Add the new result to the list
      results.push(this);

      // Write the updated results array back to the file
      fs.writeFile(resultFilePath, JSON.stringify(results, null, 2), callback);
    });
  }

  // Simulate the POST request using console.log
  static postResult(
    quizId: number, 
    userId: number, 
    score: number,
  ): void {
    // Simulate logging the POST request
    console.log(`[server]: Received POST request to /quizzes/${quizId}/results`);
    console.log(`[server]: Result submitted:`);
    console.log(`    userId: ${userId}`);
    console.log(`    score: ${score}`);
  }
}

export { Result };

