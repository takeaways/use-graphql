import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

const fetcher = async (method, path, ...rest) => {
  const response = await axios[method](path, ...rest);
  return response.data;
};

export default fetcher;
