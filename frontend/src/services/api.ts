import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  timeout: 10000,
});

export const getBugs = async () => {
  try {
    const res = await api.get('/api/bugs');
    return res.data;
  } catch (error: any) {
    console.error('Error fetching bugs:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch bugs');
  }
};

export const reportBug = async (bug: any) => {
  try {
    const res = await api.post('/api/bugs', bug);
    return res.data;
  } catch (error: any) {
    console.error('Error reporting bug:', error);
    throw new Error(error.response?.data?.error || 'Failed to report bug');
  }
};

export const predictAI = async (payload: any) => {
  try {
    const res = await api.post('/api/ai/predict', payload);
    return res.data;
  } catch (error: any) {
    console.error('Error predicting AI:', error);
    throw new Error(error.response?.data?.error || 'Failed to get AI prediction');
  }
};

export default api;
