// Create classes with their constructors, so we can access the information inside the JSON files

class Answer {
  id: number;
  questionId: number;
  text: string;
  isCorrect: boolean;

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
}
