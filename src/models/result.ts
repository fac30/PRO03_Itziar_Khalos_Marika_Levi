class Result {
  save(resultFilePath: string, arg1: (err: NodeJS.ErrnoException | null) => import("express").Response<any, Record<string, any>> | undefined) {
    throw new Error("Method not implemented.");
  }
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


  // Simulate the POST request using console.log
  static postResult(
    quizId: number, 
    userId: number, 
    score: number,
  ): void {
    // Simulate logging the POST request
    console.log(`[server]: Received POST request to /quizzes/${quizId}/results`);
    console.log(`[server]: Question submitted:`);
    console.log(`    userId: ${userId}`);
    console.log(`    score: ${score}`);
  }
}

export { Result };
