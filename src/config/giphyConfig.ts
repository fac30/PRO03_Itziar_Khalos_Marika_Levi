import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const giphyApiKey = process.env.GIPHY_API_KEY;

export const fetchGiphyMeme = async (tag: string): Promise<string> => {
  try {
    const response = await axios.get('https://api.giphy.com/v1/gifs/random', {
      params: {
        api_key: giphyApiKey,
        tag, 
        rating: 'pg-13', 
      }
    });
    const gifUrl = response.data.data.images.original.url;
    return gifUrl; 
  } catch (error) {
    console.error('Error fetching Giphy meme:', error);
    throw new Error('Unable to fetch gif from Giphy.');
  }
};