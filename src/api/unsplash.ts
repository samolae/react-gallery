import axios from 'axios';

const ACCESS_KEY = 'OxCwsnAHZDrYgYuSIespbEeBuwVeEL3QnarJUV4NS70';
const BASE_URL = 'https://api.unsplash.com';

export const fetchImages = async (query: string = '', page: number = 1, perPage: number = 30) => {
  const endpoint = query ? `${BASE_URL}/search/photos` : `${BASE_URL}/photos`;
  const params = query ? { query, page, per_page: perPage, client_id: ACCESS_KEY } : { page, per_page: perPage, client_id: ACCESS_KEY };
  try {
    const { data } = await axios.get(endpoint, { params });
    return query ? data.results : data;
  } catch (error) {
    console.error("Error fetching images from Unsplash:", error);
    throw error; // It's better to throw the error so the calling function can handle it
  }
};

