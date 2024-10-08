# Wisdom War API

## Project Overview

This is a quiz management API built using Node.js, Express, and TypeScript. It manages quizzes, questions, answers, users, and results, storing data in JSON files.

## Table of Contents

1. Project Setup
2. Data Modelling
3. API Endpoints
   - Quizzes
   - Questions
   - Answers
   - Users
   - Results

## Project Setup Instructions

### Prerequisites

Before starting, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v19.x or higher)
- **[npm](https://www.npmjs.com/)**

### Step 1: Clone the Repository

Clone the project to your local machine:

```bash
git clone https://github.com/fac30/PRO03_Itziar_Khalos_Marika_Levi.git
cd PRO03_Itziar_Khalos_Marika_Levi
```

### Step 2: Install Dependencies

Install all required Node.js packages:

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the project root and define the environment variables:

```bash
PORT=3000
```

### Step 4: Initialise TypeScript

```bash
npx tsc --init
```

This command will generate the `dist` directory containing the compiled JavaScript files.

### Step 5: Build and Run the Development Server

Compile the TypeScript files and start the development server:

```bash
npm run build
npm run dev
```

The server will start on the specified port, and you can access it at http://localhost:3000.

## Data Modelling for Quiz generator API

### Objects (Entities) and Their Attributes:

1. **Quiz**:
   - **ID**: Unique identifier for the quiz.
   - **Name**: The name of the quiz.
   - **Description**: A brief overview of the quiz.
   - **Category**: The type or topic of the quiz (e.g., science, history).
   - **Difficulty**: The difficulty level (e.g., easy, medium, hard).
   - **Number of Questions**: How many questions are in the quiz.
2. **Question**:
   - **ID**: Unique identifier for each question.
   - **Quiz ID**: A reference to the quiz this question belongs to.
   - **Text**: The actual question being asked.
   - **Type**: The type of question (e.g., multiple choice, true/false, short answer).
   - **Points**: The number of points this question is worth.
   -
3. **Answer**:
   - **ID**: Unique identifier for each answer.
   - **Question ID**: A reference to the related question.
   - **Text**: The answer content (for multiple choice, this is one of the options).
   - **Is Correct**: Boolean indicating if this is the correct answer.
   -
4. **User**:
   - **ID**: Unique identifier for each user.
   - **Name**: The name of the user.
   - **Points**: How many points the user has, for the leader board.
   -
5. **Quiz Result**:
   - **ID**: Unique identifier for each result entry.
   - **Quiz ID**: Reference to the quiz taken.
   - **User ID**: Reference to the user who took the quiz.
   - **Score**: The user's score.

### Relationships Between Objects:

- **Quiz to Question**
- **Question to Answer**
- **User to Quiz Result**
- **Quiz to Quiz Result**

## API Endpoints

### Quizzes

- GET /quizzes: Retrieve all quizzes.

```bash
curl -X GET http://localhost:3000/quizzes | jq .
```

- POST /quizzes: Add a new quiz.

```bash
curl -X POST http://localhost:3000/quizzes \
-H "Content-Type: application/json" \
-d '{"name":"Sample Quiz","description":"A test quiz","category":"General","difficulty":"easy","numberOfQuestions":10}'
```

- PATCH /quizzes/
  : Update a quiz by ID.

```bash
curl -X PATCH http://localhost:3000/quizzes/1 \
-H "Content-Type: application/json" \
-d '{"name":"Updated Quiz"}'
```

- DELETE /quizzes/
  : Delete a quiz by ID.

```bash
curl -X DELETE http://localhost:3000/quizzes/1
```

### Questions

- GET /questions: Retrieve all questions.

```bash
curl -X GET http://localhost:3000/questions
```

- POST /questions: Add a new question.

```bash
curl -X POST http://localhost:3000/questions \
-H "Content-Type: application/json" \
-d '{"quizId":1,"text":"What is the capital of France?","type":"multiple-choice","points":5}'
```

- PATCH /questions/
  : Update a question by ID.

```bash
curl -X PATCH http://localhost:3000/questions/1 \
-H "Content-Type: application/json" \
-d '{"text":"Updated question text"}'
```

- DELETE /questions/
  : Delete a question by ID.

```bash
curl -X DELETE http://localhost:3000/questions/1
```

### Answers

- GET /answers: Retrieve all answers.

```bash
curl -X GET http://localhost:3000/answers
```

- POST /answers: Add a new answer.

```bash
curl -X POST http://localhost:3000/answers \
-H "Content-Type: application/json" \
-d '{"questionId":1,"text":"Paris","isCorrect":true}'
```

- PATCH /answers/
  : Update an answer by ID.

```bash
curl -X PATCH http://localhost:3000/answers/1 \
-H "Content-Type: application/json" \
-d '{"text":"Updated answer text"}'
```

- DELETE /answers/
  : Delete an answer by ID.

```bash
curl -X DELETE http://localhost:3000/answers/1
```

### Users

- GET /users: Retrieve all users.

```bash
curl -X GET http://localhost:3000/users
```

- POST /users: Add a new user.

```bash
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"name":"John Doe","points":100}'
```

- PATCH /users/
  : Update a user by ID.

```bash
curl -X PATCH http://localhost:3000/users/1 \
-H "Content-Type: application/json" \
-d '{"name":"Jane Doe"}'
```

- DELETE /users/
  : Delete a user by ID.

```bash
curl -X DELETE http://localhost:3000/users/1
```

### Results

- GET /results: Retrieve all results.

```bash
curl -X GET http://localhost:3000/results
```

- POST /results: Add a new result.

```bash
curl -X POST http://localhost:3000/results \
-H "Content-Type: application/json" \
-d '{"quizId":1,"userId":1,"score":80}'
```

- PATCH /results/
  : Update a result by ID.

```bash
curl -X PATCH http://localhost:3000/results/1 \
-H "Content-Type: application/json" \
-d '{"score":90}'
```

- DELETE /results/
  : Delete a result by ID.

```bash
curl -X DELETE http://localhost:3000/results/1
```
