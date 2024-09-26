// src/services/spotifyService.ts
import spotifyApi, { getSpotifyAccessToken } from '../config/apiConfig';

// Function to get a track based on the user's quiz score
export const getSpotifyTrackByScore = async (score: number): Promise<string> => {
  // Mapping scores to track IDs
  const scoreTrackMap: { [key: number]: string } = {
    10: '3n3Ppam7vgaVa1iaRUc9Lp',  // Happy track ID
    9: '7ouMYWpwJ422jRcDASZB7P',   // Slightly happy track ID
    8: 'example_track_id',         // Add track IDs accordingly...
    7: 'example_track_id',
    6: 'example_track_id',
    5: 'example_track_id',
    4: 'example_track_id',
    3: 'example_track_id',
    2: 'example_track_id',
    1: 'example_track_id',
    0: '6uFn47ACjqYkc0jADwEdj1',   // Saddest track ID
  };

  try {
    await getSpotifyAccessToken();

    const trackId = scoreTrackMap[score] || scoreTrackMap[0]; // Default to saddest track
    const track = await spotifyApi.getTrack(trackId);

    const previewUrl = track.body.preview_url;
    if (previewUrl) {
      return previewUrl; // Return track preview URL
    } else {
      throw new Error('Preview URL not available for this track');
    }
  } catch (error) {
    console.error('Error fetching track from Spotify:', error);
    throw error;
  }
};

