// src/services/spotifyService.ts
import spotifyApi, { getSpotifyAccessToken } from '../config/apiConfig';

// Function to get a track based on the user's quiz score
export const getSpotifyTrackByScore = async (score: number): Promise<string> => {
  // Mapping scores to track IDs
  const scoreTrackMap: { [key: number]: string } = {
    10: '3n3Ppam7vgaVa1iaRUc9Lp',   // "Happy" - Pharrell Williams
    9:  '7ouMYWpwJ422jRcDASZB7P',    // "Good Vibrations" - The Beach Boys
    8:  '1wF5hMlZBrzOqkvbFgf2Iq',    // "Walking on Sunshine" - Katrina and the Waves
    7:  '2JwD2kG2h0L0aV3XfyTQkD',    // "Best Day of My Life" - American Authors
    6:  '4uLU8n9C8th0p5LR1syPqa',    // "Shut Up and Dance" - WALK THE MOON
    5:  '1yoJjPLsNohWqCw4J68ZPw',    // "Uptown Funk" - Mark Ronson ft. Bruno Mars
    4:  '2YZXY6ImPIv1D2UMe4Zz2D',    // "Count on Me" - Bruno Mars
    3:  '6nT9uvE8M5KxLM4cd42YkU',    // "I'm Still Standing" - Elton John
    2:  '5JdQ3bq6tUeXhddK0rKcG9',    // "I Will Survive" - Gloria Gaynor
    1:  '3Zl23hQ4DbjC7vUOr0XhZ1',    // "Someone Like You" - Adele
    0:  '6uFn47ACjqYkc0jADwEdj1',    // "Tears Dry on Their Own" - Amy WinehouseSaddest track ID
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

