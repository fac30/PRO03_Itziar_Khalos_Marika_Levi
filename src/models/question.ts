class Question {
  save(questionsFilePath: string, arg1: (err: NodeJS.ErrnoException | null) => import("express").Response<any, Record<string, any>> | undefined) {
    throw new Error("Method not implemented.");
  }
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
