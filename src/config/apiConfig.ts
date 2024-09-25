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

// src/config/apiConfig.ts
import axios from 'axios';

const giphyApiKey = process.env.GIPHY_API_KEY || 'YOUR_GIPHY_API_KEY'; // Use your actual API key here or load from env.

// Function to fetch a random Giphy based on a tag
export const fetchGiphyMeme = async (tag: string): Promise<string> => {
  try {
    const response = await axios.get('https://api.giphy.com/v1/gifs/random', {
      params: {
        api_key: giphyApiKey,
        tag: tag, // Use a tag to search for specific types of gifs
        rating: 'pg-13', // Ensure it's appropriate content
      },
    });
    const gifUrl = response.data.data.images.original.url;
    return gifUrl;
  } catch (error) {
    console.error('Error fetching Giphy meme:', error);
    throw error;
  }
};
