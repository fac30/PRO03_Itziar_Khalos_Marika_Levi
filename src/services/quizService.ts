// Core logic for quiz generation, question selection

// imports the json file(s) from data bases
import quizzesJson from "../../data/quizzes.json";
import questionJson from "../../data/questions.json";
import answersJson from "../../data/answers.json";
import resultsJson from "../../data/results.json"

// shuffle array
function shuffledArray(array: any[]) {
    // Start from the last element of the array and move backwards
    for (let i = array.length - 1; i > 0; i--) {
        // pick a random index from 0 to i
        const randomChoice = Math.floor(Math.random() * (i + 1));
        // swap the element at index i with the element at randomChoice
        [array[i], array[randomChoice]] = [array[randomChoice], array[i]];
    }
    return array;
}

// Function to get random questions based on subject and number of questions
export function getRandomQuestions(category: string) {
    // Step 1: Filter quizzes by category (subject)
    const selectQuiz = quizzesJson.filter((quiz: { category: string }) => {
        return quiz.category.toLowerCase() === category.toLowerCase();
    });

    // Step 2: If no quiz is found, return an empty array or handle error
    if (selectQuiz.length === 0) {
        console.log(`No quiz found for subject: ${category}`);
        return [];
    }

    // Step 3: Get questions from questionsJson that match the selected quiz category
    const relatedQuestions = questionJson.filter((question: { quizId: number }) => {
        return question.quizId === selectQuiz[0].id; 
    });


    // Step 4: Shuffle the filtered questions to randomise the selection
    return shuffledArray(relatedQuestions);
}

// Function to display the quiz questions to the user
function displayQuiz(questions: any[]) {
    questions.forEach((q, index) => {
        console.log(`Question ${index + 1}: ${q.question}`);
    });
}



// Function to process user answers and calculate the result
export function processQuizAnswers(userId: number, quizId: number, userAnswers: { questionId: number, answer: string }[]) {
    
    let totalCorrect = 0;
   

// Step 1: Loop through the user's answers
userAnswers.forEach(userAnswers => {
    const correctAnswer = answersJson.find(answer => answer.questionId === userAnswers.questionId);

    if(!correctAnswer) {
        console.log(`No correct answer found for the question ID ${userAnswers.questionId}`);
        return;
    }

    // Step 2: Check if the user's answer matches the correct answer
    if(userAnswers.answer.toLowerCase() === correctAnswer.text.toLocaleLowerCase()) {
        totalCorrect++;
    }

});

// Step 3: Calculate the score
const totalQuestions = userAnswers.length;
const scorePercentage = (totalCorrect/totalQuestions) * 100;

// Step 4: Store the result in result.json
const totalResult = resultsJson.findIndex(result => result.userId === userId && result.quizId === quizId);
if(totalResult !== -1) {
    resultsJson[totalResult].score = scorePercentage;
} else {
    resultsJson.push({
        id: resultsJson.length + 1,
        quizId: quizId,
        userId: userId,
        score: scorePercentage

    });
}

return {
    totalCorrect,
    totalQuestions,
    scorePercentage
};

}


