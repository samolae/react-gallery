import axios from 'axios';

const ACCESS_KEY = 'OxCwsnAHZDrYgYuSIespbEeBuwVeEL3QnarJUV4NS70';
const BASE_URL = 'https://api.unsplash.com';



export const fetchImageDetails = async (imageId: string) => {
  const endpoint = `${BASE_URL}/photos/${imageId}`;
  try {
    const { data } = await axios.get(endpoint, {
      headers: { Authorization: `Client-ID ${ACCESS_KEY}` }
    });
    return data;
  } catch (error) {
    console.error("Error fetching image details from Unsplash:", error);
    throw error;
  }
};
