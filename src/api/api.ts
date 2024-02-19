import axios from 'axios';
import { IExchangeRateData } from '../types';

export const getExchangeRate = async (): Promise<IExchangeRateData[]> => {
  const res = await axios.get<IExchangeRateData[]>(
    'https://65d1c204987977636bfb6ba9.mockapi.io/api/exchange_rate/data'
  );
  return res.data;
};
