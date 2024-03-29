import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const axios = require("axios");

const cryptoApiHeaders = {
  "x-rapidapi-host": "process.env.REACT_APP_RAPIDAPI_KEY",
  "x-rapidapi-key": "process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST",
};
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_CRYPTO_API_URL }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),

    // Note: To access this endpoint you need premium plan
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

export const fetchCryptoAPI = async (props) => {
  const url =
    "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST",
      "X-RapidAPI-Host": "process.env.REACT_APP_RAPIDAPI_KEY",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Parse response as JSON
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const {
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
