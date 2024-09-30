import express from 'express';
import { calculateScore, submitResult } from '../services/quizService'; 
import { getGiphyByScore } from '../services/giphyService';

const router = express.Router();

// Endpoint to submit quiz results and get a meme
router.post('/submit-quiz', async (req, res) => {
  const { quizId, userId, userAnswers } = req.body;

  try {
    // Calculate final quiz score
    const scorePercentage = calculateScore(quizId, userAnswers);

    // Submit the result
    const result = submitResult(quizId, userId, scorePercentage);

    // Fetch the corresponding Giphy based on score
    const gifUrl = await getGiphyByScore(result.score);
    console.log('GIF URL:', gifUrl);

    res.json({
      success: true,
      score: result.score,
      gifUrl, // Return the gif URL
    });
  } catch (error) {
    console.error('Error in /submit-quiz:', error);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

// Test route to fetch Giphy GIF based on percentage
router.get('/test-giphy', async (req, res) => {
  const { score } = req.query; // Expect score as a query parameter

  // Convert score to a number
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
// end of test


export default router;
