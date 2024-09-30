import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const giphyApiKey = process.env.GIPHY_API_KEY;

// Function to fetch a random Giphy based on a tag
export const fetchGiphyMeme = async (tag: string): Promise<string> => {
  try {
    const response = await axios.get('https://api.giphy.com/v1/gifs/random', {
      params: {
        api_key: giphyApiKey,
        tag, // Use a tag to search for specific types of gifs
        rating: 'pg-13', // Ensure it's appropriate content
      }
    });
    const gifUrl = response.data.data.images.original.url;
    return gifUrl; // Return the GIF URL
  } catch (error) {
    console.error('Error fetching Giphy meme:', error);
    throw new Error('Unable to fetch gif from Giphy.');
  }
};