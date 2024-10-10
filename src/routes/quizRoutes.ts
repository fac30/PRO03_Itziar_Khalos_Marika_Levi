// src/routes/quizRoutes.ts
import express from 'express';
import { getGiphyByScore } from '../services/giphyService';
import { calculateAnswer } from '../services/quizService'; // This function does not exist yet

const router = express.Router();

// Endpoint to submit an answer and retrieve a meme
router.post('/submit-answer', async (req, res) => {
  const { questionId, userAnswer } = req.body;

  try {
    // Logic to check if the answer is correct
    const isCorrect = calculateAnswer(questionId, userAnswer);

    // Fetch the appropriate meme (positive for correct, negative for incorrect)
    const memeUrl = await getMemeForAnswer(isCorrect);

    res.json({
      success: true,
      isCorrect,
      memeUrl, // Return the meme URL in the response
    });
  } catch (error) {
    console.error('Error in /submit-answer:', error);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

export default router;