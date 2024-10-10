import express from 'express';
import { getTopTracks } from '../services/spotifyService';

const router = express.Router();

router.get('/top-tracks', async (req, res) => {
  try {
    const playlistUrl = await getTopTracks();
    res.json({
      success: true,
      playlistUrl,
    });
  } catch (error) {
    console.error('Error in /api/spotify/top-tracks:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch top tracks from Spotify.' });
  }
});

export default router;
