import { Router } from 'express';
import { getGiphyByScore } from '../services/giphyService';

const router = Router();

// Endpoint to submit a score and get a meme
router.post('/submit-score', async (req, res) => {
  const { scorePercentage } = req.body; // Expecting score percentage from request body
  if (scorePercentage === undefined) {
    return res.status(400).json({ error: 'Score percentage is required.' });
  }

  try {
    const memeUrl = await getGiphyByScore(scorePercentage);
    res.json({ memeUrl });
  } catch (error) {
    console.error('Error fetching meme from Giphy:', error);
    res.status(500).json({ error: 'Failed to fetch meme from Giphy.' });
  }
});

export default router;
