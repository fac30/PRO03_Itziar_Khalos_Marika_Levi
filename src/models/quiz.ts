class Quiz {
  save(quizzesFilePath: string, arg1: (err: NodeJS.ErrnoException | null) => import("express").Response<any, Record<string, any>> | undefined) {
    throw new Error("Method not implemented.");
  }
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

  // with static the function is part of the blueprint, and not of the instance.
  // You can call the function using the class --> class.createQuizzesFromJSON()
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
    console.log(`[server]: Question submitted:`);
    console.log(`    description: ${quizDescription}`);
    console.log(`    category: ${quizCategory}`);
    console.log(`    difficulty: ${quizDifficulty}`);
    console.log(`    numberOfQuestions: ${numberOfQuestions}`);
  }
}

export { Quiz };
