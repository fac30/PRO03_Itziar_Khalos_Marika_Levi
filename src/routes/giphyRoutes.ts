import { Router } from 'express';
import { getMemeForAnswer } from '../services/giphyService';

const router = Router();
// Endpoint to submit an answer and get a meme
router.post('/submit-answer', async (req, res) => {
  const { isCorrect } = req.body;

  try {
    const memeUrl = await getMemeForAnswer(isCorrect);
    res.json({ memeUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch meme from Giphy.' });
  }
});

export default router;