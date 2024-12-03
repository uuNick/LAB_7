import axios from 'axios';
import {
  FETCH_BUYER,
  FETCH_BUYER_SUCCESS,
  FETCH_BUYER_FAILURE,
  FETCH_BUYER_BY_ID_SUCCESS,
  FETCH_ALL_BUYERS_SUCCESS,
  CREATE_BUYER_SUCCESS,
} from '../../actionTypes';
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
  dispatch({ type: FETCH_BUYER, payload: buyerId });
  try {
    const response = await axios.get(`${hostServer}buyer/${buyerId}/`);
    dispatch({ type: FETCH_BUYER_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BUYER_FAILURE, payload: error.message });
  }
};

export const fetchAllBuyers = () => async (dispatch) => {
  dispatch({ type: FETCH_BUYER });
  try {
    const response = await axios.get(`${hostServer}buyer/withoutPag`);
    dispatch({ type: FETCH_ALL_BUYERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BUYER_FAILURE, payload: error.message });
  }
}

export const createBuyer = (buyerData) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BUYER }); 

    const response = await fetch(`${hostServer}buyer/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buyerData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Ошибка при создании покупателя';
      throw new Error(errorMessage);
    }

    const data = await response.json();
    dispatch({ type: CREATE_BUYER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_BUYER_FAILURE, payload: error.message });
    console.error('Ошибка при создании покупателя:', error);
  }
};