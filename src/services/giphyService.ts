// src/services/giphyService.ts
import { fetchGiphyMeme } from '../config/apiConfig';

// Function to get a meme based on whether the user answered correctly or incorrectly
export const getMemeForAnswer = async (isCorrect: boolean): Promise<string> => {
  const positiveTags = ['happy', 'yay', 'celebration', 'thumbs up'];
  const negativeTags = ['fail', 'oops', 'sad', 'thumbs down'];

  // Choose tag based on correctness
  const tag = isCorrect
    ? positiveTags[Math.floor(Math.random() * positiveTags.length)]
    : negativeTags[Math.floor(Math.random() * negativeTags.length)];

  // Fetch the meme from Giphy
  const memeUrl = await fetchGiphyMeme(tag);
  return memeUrl;
};
