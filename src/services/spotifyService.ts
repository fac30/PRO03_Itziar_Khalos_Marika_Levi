import spotifyApi, { getSpotifyAccessToken } from '../config/spotifyConfig';

export const getTopTracks = async (): Promise<string | null> => {
  try {
    const accessToken = await getSpotifyAccessToken(); 
    spotifyApi.setAccessToken(accessToken);  // Set the access token for the API calls

    // Fetch the current top tracks (limit to 10)
    const response = await spotifyApi.getPlaylist('37i9dQZEVXbMDoHDwVN2tF'); // Spotify's global Top 50 playlist ID
    return response.body.external_urls.spotify; 
  } catch (error) {
    console.error('Error fetching top tracks from Spotify:', error);
    throw error;
  }
};
