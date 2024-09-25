

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

  // static async postNewAnswer(quizId: number, answer: string): Promise<Response> {
  //   const url = `http`; // replace with actual endpoint. Endpoint where the POST request is sent
  //   // API used to make HTTP requests
  //   const response = await fetch(url, {   
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     // The answer is converted to a JSON string and sent as the body of the request.
  //     body: JSON.stringify({ answer: answer }),
  //   });

  //   if (!response.ok) {
  //     throw new Error(`Failed to post answer: ${response.statusText}`);
  //   }

  //   return response;
  // }
}


export { Answer };

