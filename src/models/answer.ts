// Create classes with their constructors, so we can access the information inside the JSON files

class Answer {
  id: number;
  questionId?: number;
  text: string;
  isCorrect?: boolean;

  constructor(
    id: number,
    questionId: number,
    text: string,
    isCorrect: boolean
  ) {
    this.id = id;
    this.questionId = questionId;
    this.text = text;
    this.isCorrect = isCorrect;
  }

  // You can call the function using the class --> Answer.createAnswersFomJSON()
  static createAnswersFromJSON(jsonData: any[]): Answer[] {
    const answersList: Answer[] = [];
    for (const answer of jsonData) {
      answersList.push(
        new Answer(answer.id, answer.questionId, answer.text, answer.isCorrect)
      );
    }
    return answersList;
  }
}

export { Answer };
