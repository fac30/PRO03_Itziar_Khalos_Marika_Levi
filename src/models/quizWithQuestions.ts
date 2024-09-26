import { Quiz } from './quiz';
import { Question } from './question';
import { Answer } from './answer';

// Define a new interface that extends Quiz and adds questions with answers
interface QuizWithQuestions extends Quiz {
  questions: (Question & { answers: Answer[] })[];
}

export { QuizWithQuestions };
