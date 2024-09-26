// src/routes/apiRoutes.ts

import { Router } from 'express';
import { getSpotifyTrackByScore } from '../services/spotifyService';

const router = Router();
const totalQuestions = 10; // You might want to fetch this dynamically based on the quiz


// Route to get a Spotify track based on the quiz score
router.get('/spotify-track', async (req, res) => {
  const score = parseInt(req.query.score as string);

  if (isNaN(score) || score < 0 || score > 10) {
    return res.status(400).json({ error: 'Invalid score. Must be between 0 and 10.' });
  }

  try {
    const trackUrl = await getSpotifyTrackByScore(score, totalQuestions);
    return res.json({ trackUrl });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch track from Spotify.' });
  }
});

export default router;
