// src/routes/spotifyRoutes.ts
import express from 'express';
import { getRandomBackgroundPlaylist } from '../services/spotifyService';

const router = express.Router();

// Route to get a random background playlist
router.get('/background-playlist', async (req, res) => {
  try {
    const playlistUrl = await getRandomBackgroundPlaylist();
    res.json({
      success: true,
      playlistUrl,
    });
  } catch (error) {
    console.error('Error in /api/spotify/background-playlist:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch background playlist from Spotify.' });
  }
});

export default router;


