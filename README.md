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
## FOLDER STRUCTURE
/TheWisdomWar
│
├── data                    # Store mock data, such as JSON files for questions, answers
│   ├── quiz.json          # Mock data of quiz categories and levels of difficulty.
│   ├── answers.json       # Mock data for quiz answers
│   ├── questions.json     # Mock data for quiz questions
│   ├── results.json       # Empty array of results which will be updated dynamically
│   └── users.json            # Mock data for users and scores
│ 
├── dist
│   └── index.js   # typescript translated into js for node enviroment
│
├── /src
│   ├── /config               # Configuration files for APIs, environment variables, etc.
│   │   └── apiConfig.ts          # Contains configuration for Giphy, Spotify, etc.
│   │
│   ├── /modeles              # TypeScript interfaces for strong typing
│   │   ├── answer.ts          # Interface for quiz answers
│   │   ├── question.ts            # Interface for quiz questions
│   │   ├── quiz.ts               # interface for quiz
│   │   ├── result.ts             # interface for results
│   │   ├── user.ts              # Interface for user information
│   │   └── quizWithQuestions.ts  #Interface that extends Quiz and adds questions/answers
│   │
│   ├── /routes                  # Express routing layer (defines API routes)
│   │   ├── quizRoutes.ts         # Routes for quiz operations (questions, answers, score)
│   │   ├── userRoutes.ts         # Routes for managing users and scoreboard
│   │   └── apiRoutes.ts          # Routes for external API interaction (Giphy, Spotify)
│   │
│   ├── /services                # Service layer for business logic and API integrations
│   │   ├── quizService.ts        # Core logic for quiz generation, question selection
│   │   ├── giphyService.ts       # Giphy API integration logic (fetching memes)
│   │   └── spotifyService.ts     # Spotify API integration (fetching songs)
│   │
│   ├── index.ts                # Server configuration and initialization
│   └── tsconfig.json            # TypeScript configuration
│
│
├── .env                         # Environment variables for API keys (Giphy, Spotify)
├── package.json                 # Node.js dependencies and scripts
├── README.md                    # Documentation for project setup, API endpoints, etc.
└── .gitignore # Lock file for package versions

### Example of folder structure

/TheWisdomWar
│
├── /src
│   ├── /config                  # Configuration files for APIs, environment variables, etc.
│   │   └── apiConfig.ts          # Contains configuration for Giphy, Spotify, etc.
│   │
│   ├── /controllers             # Express route controllers for handling requests
│   │   ├── quizController.ts     # Handles quiz logic (questions, answers, scoring)
│   │   ├── userController.ts     # Manages user selection and scoring updates
│   │   └── apiController.ts      # Handles external API interactions (Giphy, Spotify)
│   │
│   ├── /routes                  # Express routing layer (defines API routes)
│   │   ├── quizRoutes.ts         # Routes for quiz operations (questions, answers, score)
│   │   ├── userRoutes.ts         # Routes for managing users and scoreboard
│   │   └── apiRoutes.ts          # Routes for external API interaction (Giphy, Spotify)
│   │
│   ├── /services                # Service layer for business logic and API integrations
│   │   ├── quizService.ts        # Core logic for quiz generation, question selection
│   │   ├── userService.ts        # User handling logic (add user, update scores)
│   │   ├── giphyService.ts       # Giphy API integration logic (fetching memes)
│   │   └── spotifyService.ts     # Spotify API integration (fetching songs)
│   │
│   ├── /middlewares             # Middleware for request validation, error handling, etc.
│   │   ├── errorHandler.ts       # Custom error handling middleware
│   │   ├── validateRequest.ts    # Middleware for validating incoming API requests
│   │   └── apiAuth.ts            # Middleware for securely handling API keys (Spotify, Giphy)
│   │
│   ├── /utils                   # Utility functions/helpers for common logic
│   │   ├── random.ts             # Utility for generating random question or meme
│   │   └── timer.ts              # Utility for calculating time-based score improvements
│   │
│   ├── /modeles              # TypeScript interfaces for strong typing
│   │   ├── answer.ts          # Interface for quiz answers
│   │   ├── question.ts            # Interface for quiz questions
│   │   ├── quiz.ts               # interface for quiz
│   │   ├── result.ts             # interface for results
│   │   ├── user.ts              # Interface for user information
│   │   └── quizWithQuestions.ts       # interface that extends Quiz and adds questions with answers
│   │
│   ├── app.ts                   # Main entry point for the Express server
│   ├── index.ts                # Server configuration and initialization
│   └── tsconfig.json            # TypeScript configuration
│
├── /test                        # Test files for unit/integration tests
│   ├── quizService.test.ts       # Unit tests for quiz logic
│   └── apiController.test.ts     # Unit tests for external API handling
│
├── data                    # Store mock data, such as JSON files for questions, answers
│   ├── quiz.json          # Mock data of quiz categories and 3 levels of difficulty. Categories are: 1 FAC, 2 ART, 3 Music, 4 Movies. Difficulty levels are: 1 easy, 2 medium, 3 hard. 
│   ├── answers.json       # Mock data for quiz answers
│   ├── questions.json     # Mock data for quiz questions
│   ├── results.json        # Empty array of results which will be updated upon users playing the quiz
│   └── users.json            # Mock data for users and scores
│
├── dist
│   └── index.js   # this file makes sure typescript code is translated into js so that we can run typescript files within the node enviroment
│
├── .env                         # Environment variables for API keys (Giphy, Spotify)
├── package.json                 # Node.js dependencies and scripts
├── README.md                    # Documentation for project setup, API endpoints, etc.
└── .gitignore # Lock file for package versions

## APIs Overview
This Quiz App allows users to answer a customizable set of quiz questions, get feedback in the form of a GIF (using Giphy API), and listen to relaxing background music (using Spotify API) while taking the quiz.

- Giphy Integration: Displays a GIF based on the user's quiz score. The GIFs range from celebratory (100% correct answers) to fun/fail (0% correct answers).
- Spotify Integration: Plays a random background playlist (e.g., classical music, movie soundtracks) while the user is on the quiz page.

### Giphy Integration
#### Giphy Setup
1. Giphy API Key:

You need to register on Giphy Giphy Developers and get an API key. This key is necessary to fetch GIFs based on the score the user receives in the quiz.

2. .env File Configuration:

Store the Giphy API key securely in an .env file:
```
GIPHY_API_KEY=your_giphy_api_key_here
```
#### Giphy Service Implementation
The giphyService.ts file contains the core logic for interacting with the Giphy API.

Giphy API Logic:
- Based on the user's quiz score (0-100%), the app fetches a GIF using Giphy's Random GIF API.
- The score is divided into intervals (100%, 90%, 80%, etc.) to get different GIFs for different ranges.
```typescript
import axios from 'axios';

export async function getGiphyByScore(score: number): Promise<string> {
  try {
    const positivity = score >= 80 ? 'positive' : 'negative';
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=${positivity}`
    );
    
    return response.data.data.images.original.url; // Returns the GIF URL
  } catch (error) {
    console.error('Error fetching Giphy:', error);
    throw new Error('Failed to fetch GIF from Giphy.');
  }
}
```

#### Testing Giphy
To test the Giphy integration, you can use the following cURL command, which simulates an API request:

```bash
curl "http://localhost:3000/api/test-giphy?score=90"
```

The score parameter can be any number between 0 and 100, and based on this score, the app will return a GIF URL.

### Spotify Integration
#### Spotify Setup
1. Spotify Developer Account:

You need a Spotify Developer account. Head over to Spotify for Developers and create an app to get the Client ID and Client Secret.

2. Spotify API Keys:

Add your Spotify credentials to the .env file:
```
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```
#### Spotify Service Implementation
The spotifyService.ts file implements the logic to retrieve a random playlist for background music.

- Spotify API Logic:
The app authenticates with the Spotify API using Client Credentials Flow.
- A random playlist URL (e.g., classical music or movie soundtracks) is fetched and returned.
```typescript
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

async function authenticateSpotify() {
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body['access_token']);
}

export async function getRandomBackgroundPlaylist(): Promise<string> {
  try {
    await authenticateSpotify();

    const playlistIds = [
      '37i9dQZF1DWWEJlAGA9gs0', // Classical Essentials
      '37i9dQZF1DX4sWSpwq3LiO', // Movie Soundtracks
      '37i9dQZF1DWXRqgorJj26U', // Calm Vibes
    ];

    const randomPlaylistId = playlistIds[Math.floor(Math.random() * playlistIds.length)];
    return `https://open.spotify.com/playlist/${randomPlaylistId}`;
  } catch (error) {
    console.error('Error fetching Spotify playlist:', error);
    throw new Error('Failed to fetch background playlist from Spotify.');
  }
}
```

#### Testing Spotify
You can test the Spotify integration by hitting the following endpoint with a cURL command:

```bash
curl "http://localhost:3000/api/spotify/background-playlist"
```

The response will return a playlist URL that will play background music on the quiz page.

#### Running the Project
1. Install Dependencies: Run the following command to install all necessary Node.js modules:

```bash
npm install
```

2. Start the Server: Use the following command to start the server:

```bash
npm run dev
```

3. Test the API: You can test the API routes via cURL commands or tools like Postman to ensure that both Giphy and Spotify integrations are working.

#### How to Test
You can test the Giphy and Spotify services by making HTTP requests using cURL or Postman.

- Test Giphy:

```bash
curl "http://localhost:3000/api/test-giphy?score=90"
```

This will return a URL to a GIF based on the user's score.

- Test Spotify:

```bash
curl "http://localhost:3000/api/spotify/background-playlist"
```

This will return a URL to a random background playlist from Spotify.

#### Future Enhancements
- React Frontend: The current implementation is backend-focused. In the future, we can build a React-based frontend to display the GIFs dynamically and control Spotify playback via a UI controller.

- Controller for Background Music: In the React frontend, we can add a controller for Spotify playback, allowing users to mute the music or skip to the next random playlist.

- More GIF and Playlist Variety: Expand the range of GIFs and background playlists to provide more variety and make the user experience more engaging.