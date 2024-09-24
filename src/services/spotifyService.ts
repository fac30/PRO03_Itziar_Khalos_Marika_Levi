// src/services/spotifyService.ts

import spotifyApi, { getSpotifyAccessToken } from '../config/apiConfig';

// Function to get a playlist based on the user's quiz score
export const getSpotifyTrackByScore = async (score: number): Promise<string> => {
  // Mapping scores to different playlist or track IDs
  const scoreTrackMap: { [key: number]: string } = {
    10: '3n3Ppam7vgaVa1iaRUc9Lp',  // Happy track ID (example)
    9: '7ouMYWpwJ422jRcDASZB7P',   // Slightly happy track ID (example)
    // Add more mappings here for other scores...
    0: '6uFn47ACjqYkc0jADwEdj1',   // Saddest track ID (example)
  };

  try {
    // Ensure we have a valid access token
    await getSpotifyAccessToken();

    // Get the track ID based on the score
    const trackId = scoreTrackMap[score] || scoreTrackMap[0]; // Default to the saddest track if no match

    // Fetch the track data from Spotify API
    const track = await spotifyApi.getTrack(trackId);

    // Check if the preview URL exists, otherwise return a default or handle it
    const previewUrl = track.body.preview_url;
    if (previewUrl) {
      return previewUrl;  // Return the track's preview URL if available
    } else {
      throw new Error('Preview URL not available for this track');
      // Alternatively, you can return a placeholder URL or empty string:
      // return 'https://example.com/placeholder.mp3';
    }
  } catch (error) {
    console.error('Error fetching track from Spotify:', error);
    throw error;
  }
};
