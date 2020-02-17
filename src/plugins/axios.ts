import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 0,
  withCredentials: true
});
