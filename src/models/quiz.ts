class Quiz {
  id: number;
  name: string;
  description: string;
  category: string;
  difficulty: string;

  constructor(
    id: number,
    name: string,
    description: string,
    category: string,
    difficulty: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.difficulty = difficulty;
  }

  // with static the function is part of the blueprint, and not of the instance.
  // You can call the function using the class --> Quiz.createQuizzesFromJSON()
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
        )
      );
    }
    return quizzesList;
  }
}

export { Quiz };
