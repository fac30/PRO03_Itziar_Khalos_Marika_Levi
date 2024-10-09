import spotifyApi, { getSpotifyAccessToken } from '../config/spotifyConfig';
const scoreTrackMap: { [key: number]: string } = {
  10: '3n3Ppam7vgaVa1iaRUc9Lp',  // Happy track ID
  9: '7ouMYWpwJ422jRcDASZB7P',   // Slightly happy track ID
  8: '4cOdK2wGLETKBW3PvgPWqT',   // Track example
  7: '1dGr1c8CrMLDpV6mPbImSI',
  6: '2takcwOaAZWiXQijPHIx7B',
  5: '1hKdDCpiI9mqz1jVHRKG0E',
  4: '6zspalBd1ZexrQNXYzLOhS',
  3: '5IX4TbInV0jbu1MQhkljbI',
  2: '7fHbikDD4ld6xwr5xFybW0',
  1: '0U6ldwLBEMkwgfQRY4V6D2',
  0: '6uFn47ACjqYkc0jADwEdj1'    // Saddest track ID
};

export const getSpotifyTrackByScore = async (score: number): Promise<string> => {
  try {
    await getSpotifyAccessToken();  
    const trackId = scoreTrackMap[score] || scoreTrackMap[0];  // Default to saddest track if score is invalid
    const track = await spotifyApi.getTrack(trackId);
    if (track.body.preview_url) {
      return track.body.preview_url;  // Return the track's preview URL
    } else {
      throw new Error('No preview URL available');
    }
  } catch (error) {
    throw error;
  }
};