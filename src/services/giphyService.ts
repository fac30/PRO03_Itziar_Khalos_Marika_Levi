// src/services/giphyService.ts
import { fetchGiphyMeme } from '../config/apiConfig';

// Function to get a meme based on whether the user answered correctly or incorrectly
export const getMemeForAnswer = async (isCorrect: boolean): Promise<string> => {
  const positiveTags = ['happy', 'yay', 'celebration', 'thumbs up'];
  const negativeTags = ['fail', 'oops', 'sad', 'thumbs down'];

  // If the answer is correct, fetch a positive meme, otherwise a negative meme
  const tag = isCorrect
    ? positiveTags[Math.floor(Math.random() * positiveTags.length)]  // Random positive tag
    : negativeTags[Math.floor(Math.random() * negativeTags.length)]; // Random negative tag

  // Fetch the meme from Giphy
  const memeUrl = await fetchGiphyMeme(tag);
  return memeUrl;
};
