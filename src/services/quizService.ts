// Core logic for quiz generation, question selection

// imports the json file(s) - do this with Marika's data bases
import quizzesJson from "../../data/quizzes.json";
import questionJson from "../../data/questions.json"

// shuffle array
function shuffledArray(array: any[]) {
    // Start from the last element of the array and move backwards
    for (let i = array.length - 1; i > 0; i--) {
        // pick a random index from 0 to i
        const randomChoice = Math.floor(Math.random() * (i + 1));
        // swap the element at index i with the element at randomChoice
        [array[i], array[randomChoice]] = [array[randomChoice], array[i]];
    }
}

// Function to get random questions based on subject and number of questions
function getRandomQuestions(category: string) {
    // Step 1: Filter quizzes by category (subject)
    const selectQuiz = quizzesJson.filter((quiz: { category: string }) => {
        return quiz.category.toLowerCase() === category.toLowerCase();
    });

    // Step 2: If no quiz is found, return an empty array or handle error
    if (selectQuiz.length === 0) {
        console.log(`No quiz found for subject: ${category}`);
        return [];
    }

     // Step 3: Choose the first matching quiz
     const selecteQuiz = selectQuiz[0];


    // Step 4: Shuffle the filtered questions to randomise the selection
    const shuffleQuestions = shuffledArray(selectQuiz);
}


