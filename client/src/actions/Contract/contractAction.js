import axios from 'axios';
import {
  FETCH_CONTRACT,
  FETCH_CONTRACT_SUCCESS,
  FETCH_CONTRACT_FAILURE,
  CREATE_CONTRACT_SUCCESS
} from '../../actionTypes';
import hostServerJSON from "../hostServer.json";

const hostServer = hostServerJSON.path;

export const fetchContract = (page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_CONTRACT });
  try {
    const response = await axios.get(`${hostServer}Contract/?page=${page}&limit=${limit}`);
    dispatch({ type: FETCH_CONTRACT_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_CONTRACT_FAILURE, payload: error.message });
  }
};

export const createContract = (contractData) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CONTRACT });

    const response = await fetch(`${hostServer}contract/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contractData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = errorData.message || 'Ошибка при создании контракта';
      // Проверяем на специфическую ошибку покупателя
      if (response.status === 400 && errorMessage.includes('Покупатель')) {
        errorMessage = 'Покупатель с указанным ID не существует';
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    dispatch({ type: CREATE_CONTRACT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CONTRACT_FAILURE, payload: error.message });
    console.error('Ошибка при создании контракта:', error);
  }
};