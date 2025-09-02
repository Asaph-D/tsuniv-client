import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
    timeout: 10000, // Request timeout
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true, // Include cookies in requests
});
export default axiosInstance;