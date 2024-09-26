// src/routes/quizRoutes.ts
import express from 'express';
import { getMemeForAnswer } from '../services/giphyService';
import { calculateScore, submitResult } from '../services/quizService'; // Import calculateScore and submitResult
import { getSpotifyTrackByScore } from '../services/spotifyService'; // Import Spotify service

const router = express.Router();
const totalQuestions = 10; // You might want to fetch this dynamically based on the quiz

// Endpoint to submit an answer and retrieve a meme
router.post('/submit-answer', async (req, res) => {
  const { questionId, userAnswer, quizId, userId } = req.body; // Also expect quizId and userId

  try {
    // Logic to check if the answer is correct
    const isCorrect = calculateScore(quizId, [{ questionId, selectedAnswerId: userAnswer }]) > 0;

    // Fetch the appropriate meme (positive for correct, negative for incorrect)
    const memeUrl = await getMemeForAnswer(isCorrect);

    // Update the score and submit result if the quiz is completed
    const score = isCorrect ? 1 : 0; // Simplified for example
    const result = submitResult(quizId, userId, score);

    // Get the corresponding Spotify track based on the score
    const trackUrl = await getSpotifyTrackByScore(result.score, totalQuestions);

    res.json({
      success: true,
      isCorrect,
      memeUrl,
      trackUrl, // Return the track URL in the response
    });
  } catch (error) {
    console.error('Error in /submit-answer:', error);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

export default router;
