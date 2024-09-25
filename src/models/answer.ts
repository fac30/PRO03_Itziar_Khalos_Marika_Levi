// Create classes with their constructors, so we can access the information inside the JSON files
class Answer {
  id: number;
  questionId: number;
  text: string;
  isCorrect: boolean;

  constructor(id: number, questionId: number, text: string, isCorrect: boolean) {
    this.id = id;
    this.questionId = questionId;
    this.text = text;
    this.isCorrect = isCorrect;
  }


  // Simulate the POST request using console.log
  static postNewAnswer(quizId: number, answer: string): void {
    // Simulate logging the POST request
    console.log(`[server]: Received POST request to /quizzes/${quizId}/answers`);
    console.log(`[server]: Answer submitted: ${answer}`);
  }

}


export { Answer };

