// src/config/apiConfig.ts
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
// Spotify API client setup
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});
// Retrieve an access token
export const getSpotifyAccessToken = async (): Promise<void> => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    const accessToken = data.body['access_token'];
    spotifyApi.setAccessToken(accessToken);
    console.log('Spotify access token retrieved successfully');
  } catch (error) {
    console.error('Error retrieving Spotify access token:', error);
  }
};
export default spotifyApi;