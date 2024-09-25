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
  // Static method to create multiple Answer instances from JSON
  static createAnswersFromJSON(jsonData: any[]): Answer[] {
    const answerList: Answer[] = [];
    for (const answer of jsonData) {
      const newAnswer = new Answer(
        answer.id, 
        answer.questionId, 
        answer.text, 
        answer.isCorrect
      );
      answersList.push(newAnswer);
    }
    return answerList;

  }
}

// a POST request --> receiving data from the client, processing it (validating/converting it into an Answer object),
// then saving it to a file/database
app.post('/Answer', (req: Request, res: Response) => {
  const answersFilePath = path.join(__dirname, 'Answer.json');

  // Read the users.json file
  FileSystem.readFile(answersFilePath, JSON.stringify(Answer, , ), (err) => {
    if(err) {
      return res.status(500).json({ error: 'Error reading the answer' });
    }
  })
  // 
  res.status(200).json(Answer)

}
      

export { Answer };
