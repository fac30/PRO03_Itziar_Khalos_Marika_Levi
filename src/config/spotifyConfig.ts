// src/config/spotifyConfig.ts
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Spotify API client setup
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Retrieve an access token
export const getSpotifyAccessToken = async (): Promise<string> => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    const accessToken = data.body['access_token'];
    spotifyApi.setAccessToken(accessToken);
    console.log('Spotify access token retrieved successfully');
    return accessToken; // Return the access token as a string
  } catch (error) {
    console.error('Error retrieving Spotify access token:', error);
    throw new Error('Failed to retrieve access token'); // Throw an error to be caught in the calling function
  }
};

export default spotifyApi;
