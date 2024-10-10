class Result {
  id: number;
  quizId: number;
  userId: number;
  score: number;
  totalQuestions?: number;

  constructor(
    id: number,
    quizId: number,
    userId: number,
    score: number,
    totalQuestions: number
  ) {
    this.id = id;
    this.quizId = quizId;
    this.userId = userId;
    this.score = score;
    this.totalQuestions = totalQuestions;
  }

  // You can call the function using the class --> Result.createResultsFromJSON()
  static createResultsFromJSON(jsonData: any[]): Result[] {
    const resultsList: Result[] = [];
    for (const result of jsonData) {
      resultsList.push(
        new Result(
          result.id,
          result.quizId,
          result.userId,
          result.score,
          result.totalQuestions
        )
      );
    }
    return resultsList;
  }
}

export { Result };
