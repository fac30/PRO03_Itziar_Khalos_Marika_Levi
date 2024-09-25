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
}

export { Result };
