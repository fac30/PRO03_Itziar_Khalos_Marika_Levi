// src/routes/quizRoutes.ts
import express from 'express';
import { getQuizResultWithGif } from '../services/quizService'; // Import the new function
import { getGiphyByScore } from '../services/giphyService';
import { getTopTracks } from '../services/spotifyService'; // Import Spotify service

const router = express.Router();

// Route to handle quiz submission and return result with GIF and Spotify playlist
router.post('/submit-quiz', async (req, res) => {
  const { quizId, userId, userAnswers } = req.body;

  try {
    // Use the new service function to get quiz result and GIF
    const quizResultWithGif = await getQuizResultWithGif(userId, quizId, userAnswers);

    // Fetch the Spotify Top Tracks playlist URL
    const playlistUrl = await getTopTracks();

    // Send the result back as the response, including the playlist URL
    res.json({
      success: true,
      ...quizResultWithGif, // Send the entire result object including gifUrl
      playlistUrl, // Include the Spotify playlist URL
    });
  } catch (error) {
    console.error('Error in /submit-quiz:', error);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

// Test route to fetch Giphy GIF based on a test score
router.get('/test-giphy', async (req, res) => {
  const { score } = req.query; // Expect score as a query parameter

  // Convert score to a number and validate it
  const numericScore = parseFloat(score as string);
  if (isNaN(numericScore) || numericScore < 0 || numericScore > 100) {
    return res.status(400).json({ error: 'Invalid score. Please provide a score between 0 and 100.' });
  }

  try {
    // Call the service to get the appropriate GIF based on the score
    const gifUrl = await getGiphyByScore(numericScore);
    res.json({
      success: true,
      score: numericScore,
      gifUrl,
    });
  } catch (error) {
    console.error('Error fetching GIF:', error);
    res.status(500).json({ error: 'Failed to fetch GIF' });
  }
});

export default router;
