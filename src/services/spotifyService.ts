// src/services/spotifyService.ts
import spotifyApi, { getSpotifyAccessToken } from '../config/spotifyConfig';

const backgroundPlaylists = [
  '37i9dQZF1DWWEJlAGA9gs0', // Classical Essentials
  '37i9dQZF1DWTTQ4F9HvbHV', // Ludovico Einaudi Essentials
  '37i9dQZF1DWV0gynK7G6pD', // Classical Focus
  '37i9dQZF1DWXmDxoFybV8T', // Hans Zimmer Soundtracks
  '37i9dQZF1DX7FVBLcFaYHs', // Movie Soundtracks
];

// Function to fetch a random background playlist
export const getRandomBackgroundPlaylist = async (): Promise<string | null> => {
  try {
    await getSpotifyAccessToken(); // Ensure token is valid

    // Select a random playlist ID from the list
    const randomIndex = Math.floor(Math.random() * backgroundPlaylists.length);
    const playlistId = backgroundPlaylists[randomIndex];

    const playlist = await spotifyApi.getPlaylist(playlistId);
    return playlist.body.external_urls.spotify; // Return Spotify playlist URL
  } catch (error) {
    console.error('Error fetching playlist from Spotify:', error);
    throw error;
  }
};
