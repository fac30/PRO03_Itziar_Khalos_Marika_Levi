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

  // with static the function is part of the blueprint, and not of the instance.
  // You can call the function using the class --> class.createQuizzesFromJSON()
  static createQuizzesFromJSON(jsonData: any[]): Quiz[] {
    const quizzesList = [];
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
}

export { Quiz };
