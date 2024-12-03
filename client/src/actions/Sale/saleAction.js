import axios from 'axios';
import {
  FETCH_SALE,
  FETCH_SALE_SUCCESS,
  FETCH_SALE_FAILURE,
  CREATE_SALE_SUCCESS
} from '../../actionTypes';
import hostServerJSON from "../hostServer.json";
const hostServer = hostServerJSON.path;

export const fetchSale = (page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_SALE });
  try {
    const response = await axios.get(`${hostServer}Sale/?page=${page}&limit=${limit}`);
    dispatch({ type: FETCH_SALE_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_SALE_FAILURE, payload: error.message });
  }
};

export const createSale = (saleData) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SALE }); 

    const response = await fetch(`${hostServer}sale/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = errorData.message || 'Ошибка при создании продажи';
      if (response.status === 400 && errorMessage.includes('Контракт')) {
        errorMessage = 'Контракт с указанным номером не существует';
      }
      else if(response.status === 400 && errorMessage.includes('Мебель')){
        errorMessage = 'Мебель с указанным ID не существует';
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    dispatch({ type: CREATE_SALE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_SALE_FAILURE, payload: error.message });
    console.error('Ошибка при создании продажи:', error);
  }
};