import axios from 'axios';
import { FETCH_BUYER, FETCH_BUYER_SUCCESS, FETCH_BUYER_FAILURE, FETCH_BUYER_BY_ID, FETCH_BUYER_BY_ID_SUCCESS, FETCH_ALL_BUYERS, FETCH_ALL_BUYERS_SUCCESS } from '../../actionTypes';
import hostServerJSON from "../hostServer.json";
const hostServer = hostServerJSON.path;

export const fetchBuyer = (page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_BUYER });
  try {
    const response = await axios.get(`${hostServer}buyer/?page=${page}&limit=${limit}`);
    dispatch({ type: FETCH_BUYER_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_BUYER_FAILURE, payload: error.message });
  }
};

export const fetchBuyerById = (buyerId) => async (dispatch) => {
  dispatch({ type: FETCH_BUYER_BY_ID, payload: buyerId }); // Отправляем ID в payload
  try {
    const response = await axios.get(`${hostServer}buyer/${buyerId}/`); // API endpoint для получения по ID
    dispatch({ type: FETCH_BUYER_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BUYER_FAILURE, payload: error.message });
  }
};

export const fetchAllBuyers = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_BUYERS });
  try {
    const response = await axios.get(`${hostServer}buyer/withoutPag`);
    dispatch({ type: FETCH_ALL_BUYERS_SUCCESS, payload: response.data });
  } catch (error){
    dispatch({ type: FETCH_BUYER_FAILURE, payload: error.message });
  }
}