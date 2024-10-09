// Core logic for quiz generation, question selection

// Imports the JSON file(s) from databases
import quizzesJson from "../../data/quizzes.json";
import questionJson from "../../data/questions.json";
import answersJson from "../../data/answers.json";
import { getGiphyByScore } from './giphyService'; 

// Define the QuizResult interface
interface QuizResult {
    id: number;
    quizId: number;
    userId: number;
    score: number;
    strengths: number[];  
    weaknesses: number[]; 
}

// Import the resultsJson
const resultsJson: QuizResult[] = require("../../data/results.json");

// Shuffle array function
function shuffledArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomChoice = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomChoice]] = [array[randomChoice], array[i]];
    }
    return array;
}

// Function to get random questions based on subject and difficulty level
export function getRandomQuestions(category: string, difficulty: string) {
    // Step 1: Filter quizzes by category and difficulty
    const selectedQuiz = quizzesJson.find((quiz) => {
        return quiz.category.toLowerCase() === category.toLowerCase() &&
               quiz.difficulty.toLowerCase() === difficulty.toLowerCase();
    });

    // Step 2: If no quiz is found, handle the error
    if (!selectedQuiz) {
        console.log(`No quiz found for category: ${category} and difficulty: ${difficulty}`);
        return [];
    }

    // Step 3: Collect all related questions from the selected quiz
    const relatedQuestions = questionJson.filter((question: { quizId: number }) => {
        return question.quizId === selectedQuiz.id;
    });

    // Step 4: Shuffle the questions to randomize the order
    const shuffledQuestions = shuffledArray(relatedQuestions);

    // Step 5: Return the shuffled questions
    return shuffledQuestions;
}

// Function to display the quiz questions to the user
export function displayQuiz(questions: any[]) {
    questions.forEach((q, index) => {
        console.log(`Question ${index + 1}: ${q.text}`);
        
        // Get the options (answers) related to this question
        const questionOptions = answersJson.filter((answer) => {
            return answer.questionId === q.id; // Match the question ID with the answer's questionId
        });

        // Display the options (answers) for the current question
        if (questionOptions.length > 0) {
            questionOptions.forEach((option, i) => {
                console.log(`Option ${i + 1}: ${option.text}`);
            });
        } else {
            console.log("No options available for this question.");
        }
    });
}

// Function to process user answers and calculate the result
export function processQuizAnswers(
    userId: number, 
    quizId: number, 
    userAnswers: { questionId: number, answer: string }[]
) {
    let totalCorrect = 0;
    const strengths: number[] = [];   // For tracking correct answers (strengths)
    const weaknesses: number[] = [];  // For tracking incorrect answers (weaknesses)

    // Step 1: Loop through the user's answers
    userAnswers.forEach(userAnswer => {
        const correctAnswer = answersJson.find(answer => answer.questionId === userAnswer.questionId && answer.isCorrect);

        // Step 2: Check if a correct answer exists for the question
        if (!correctAnswer) {
            console.log(`No correct answer found for question ID ${userAnswer.questionId}`);
            weaknesses.push(userAnswer.questionId); // Log this as a weakness
            return;
        }

        // Step 3: Check if the user's answer matches the correct answer
        if (userAnswer.answer.trim().toLowerCase() === correctAnswer.text.trim().toLowerCase()) {
            totalCorrect++;
            strengths.push(userAnswer.questionId); // Log this as a strength
        } else {
            weaknesses.push(userAnswer.questionId); // Log this as a weakness
        }
    });

    // Step 4: Calculate the score
    const totalQuestions = userAnswers.length;
    const scorePercentage = (totalCorrect / totalQuestions) * 100;

    // Step 5: Store the result in resultsJson
    const existingResultIndex = resultsJson.findIndex(result => result.userId === userId && result.quizId === quizId);

    // Prepare the result data object
    const resultData = {
        id: resultsJson.length + 1,
        quizId: quizId,
        userId: userId,
        score: scorePercentage,
        strengths: strengths,   
        weaknesses: weaknesses  
    };

    if (existingResultIndex !== -1) {
        // Update the existing result
        resultsJson[existingResultIndex] = resultData;
    } else {
        // Add new result if none exists
        resultsJson.push(resultData);
    }

    // Return the result object
    return {
        totalCorrect,
        totalQuestions,
        scorePercentage,
        strengths,
        weaknesses
    };
}

// NEW FUNCTION: Combine quiz results and Giphy meme fetching
export async function getQuizResultWithGif(
    userId: number, 
    quizId: number, 
    userAnswers: { questionId: number, answer: string }[]
) {
    // Step 1: Process the user's answers
    const quizResult = processQuizAnswers(userId, quizId, userAnswers);

    // Step 2: Fetch the appropriate Giphy meme based on score
    const gifUrl = await getGiphyByScore(quizResult.scorePercentage);

    // Step 3: Return the result with the Giphy meme URL
    return {
        ...quizResult,
        gifUrl,  // Attach the GIF URL to the result
    };
}


