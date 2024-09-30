import { fetchGiphyMeme } from '../config/giphyConfig';

// Define tags for different score ranges
const scoreGifMap: { [key: number]: string[] } = {
  100: ['celebration', 'well done', 'winner', 'awesome'],
  90: ['great', 'happy', 'success'],
  80: ['good job', 'well done', 'almost'],
  70: ['not bad', 'you did it'],
  60: ['ok', 'could be better'],
  50: ['meh', 'you tried'],
  40: ['oops', 'not good'],
  30: ['fail', 'thumbs down'],
  20: ['bad', 'try again'],
  10: ['very bad', 'oops'],
  0:  ['disaster', 'you fail', 'total fail'],
};

// Function to get a Giphy based on the user's score percentage
export const getGiphyByScore = async (scorePercentage: number): Promise<string> => {
  const roundedScore = Math.floor(scorePercentage / 10) * 10; // Round down to nearest 10%
  const tags = scoreGifMap[roundedScore] || scoreGifMap[0];    // Default to 0 if no match

  // Pick a random tag from the selected score's tags
  const randomTag = tags[Math.floor(Math.random() * tags.length)];

  // Fetch the meme from Giphy
  try {
    const gifUrl = await fetchGiphyMeme(randomTag);
    return gifUrl;
  } catch (error) {
    throw new Error('Error fetching meme for score.');
  }
};
