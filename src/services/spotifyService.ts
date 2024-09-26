// src/services/spotifyService.ts

import spotifyApi, { getSpotifyAccessToken } from '../config/apiConfig';

// Function to get a track based on the user's quiz score
export const getSpotifyTrackByScore = async (score: number, totalQuestions: number): Promise<string> => {
  // Calculate the score as a percentage
  const percentageScore = Math.round((score / totalQuestions) * 10); // Scale to 0-10 range

  // Ensure the percentage score is within the range of 0-10
  const finalScore = Math.max(0, Math.min(10, percentageScore)); 

  // Mapping scores to different track IDs
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
    0:  '6uFn47ACjqYkc0jADwEdj1',    // "Tears Dry on Their Own" - Amy Winehouse
  };

  try {
    // Ensure we have a valid access token
    await getSpotifyAccessToken();

    // Fetch the track ID based on the calculated percentage score
    const trackId = scoreTrackMap[finalScore]; 

    // Fetch the track data from Spotify API
    const track = await spotifyApi.getTrack(trackId);

    // Check if the preview URL exists, otherwise return a default or handle it
    const previewUrl = track.body.preview_url;
    if (previewUrl) {
      return previewUrl;  // Return the track's preview URL if available
    } else {
      throw new Error('Preview URL not available for this track');
    }
  } catch (error) {
    console.error('Error fetching track from Spotify:', error);
    throw error;
  }
};
