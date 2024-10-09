import axios from './axios';
import { API_URL } from '../utils/constants';

export const fetchTransactions = async (page = 1, perPage = 15, search = '',month='') => {
  const url = `${API_URL}/transactions`;
  const response = await axios.get(url, {
    params: {
      page,
      perPage,
      search,
      month
    },
  });
  return response.data;
};

export const fetchStatistics = async (month) => {
  const url = `${API_URL}/statistics`;
  const response = await axios.get(url, {
    params: {
      month,
    },
  });
  return response.data;
};

export const fetchBarChartData = async (month) => {
  const url = `${API_URL}/barchart`;
  const response = await axios.get(url, {
    params: {
      month,
    },
  });
  return response.data;
};