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
  // You can call the function using the class --> Question.createQuestionsFromJSON()
  static createQuestionsFromJSON(jsonData: any[]): Question[] {
    const questionsList: Question[] = [];
    for (const question of jsonData) {
      questionsList.push(
        new Question(
          question.id,
          question.quizId,
          question.text,
          question.type,
          question.points
        )
      );
    }
    return questionsList;
  }
}

export { Question };
