// src/routes/quizRoutes.ts

import express from 'express';
import { getQuizResultWithGif } from '../services/quizService'; // Import the new function
import { getGiphyByScore } from '../services/giphyService';
const router = express.Router();

// Route to handle quiz submission and return result with GIF
router.post('/submit-quiz', async (req, res) => {
  const { quizId, userId, userAnswers } = req.body;

  try {
    // Use the new service function to get quiz result and GIF
    const quizResultWithGif = await getQuizResultWithGif(userId, quizId, userAnswers);

    // Send the result back as the response
    res.json({
      success: true,
      ...quizResultWithGif, // Send the entire result object including gifUrl
    });
  } catch (error) {
    console.error('Error in /submit-quiz:', error);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

export default router;