import { fetchGiphyMeme } from '../config/giphyConfig';

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
  
  // If the score is above 100 or below 0, it should default to closest valid range.
  const validScore = Math.min(Math.max(roundedScore, 0), 100);
  const tags = scoreGifMap[validScore] || scoreGifMap[0];    // Default to 0 if no match
  const randomTag = tags[Math.floor(Math.random() * tags.length)];
  
  try {
    const gifUrl = await fetchGiphyMeme(randomTag);
    return gifUrl;
  } catch (error) {
    throw new Error('Error fetching meme for score.');
  }
};
