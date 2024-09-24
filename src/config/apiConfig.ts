// src/config/apiConfig.ts

import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Spotify API client setup
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,  // Optional, used for auth flow if needed
});

// Get an access token using the client credentials flow
export const getSpotifyAccessToken = async (): Promise<void> => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    const accessToken = data.body['access_token'];
    spotifyApi.setAccessToken(accessToken);
    console.log('Spotify access token retrieved successfully');
  } catch (err) {
    console.error('Error retrieving Spotify access token:', err);
  }
};

export default spotifyApi;
