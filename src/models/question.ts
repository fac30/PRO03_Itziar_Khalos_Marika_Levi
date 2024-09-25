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
}

export { Question };
