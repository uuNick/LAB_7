import axios from 'axios';
import {
  FETCH_CONTRACT,
  FETCH_CONTRACT_SUCCESS,
  FETCH_CONTRACT_FAILURE,
  CREATE_CONTRACT_SUCCESS,
  UPDATE_CONTRACT_SUCCESS,
  DELETE_CONTRACT_SUCCESS,
  SORT_CONTRACT_SUCCESS,
  FIND_CONTRACT_SUCCESS
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

    const response = await axios.post(`${hostServer}contract/`, contractData);

    if (!response.data) {
      throw new Error('Ошибка при создании контракта: Сервер вернул пустой ответ.');
    }

    if (response.status === 400) {
      let errorMessage = response.data.message || 'Ошибка при создании контракта';
      if (errorMessage.includes('Покупатель')) {
        errorMessage = 'Покупатель с указанным ID не существует';
      }
      throw new Error(errorMessage);
    }

    dispatch({ type: CREATE_CONTRACT_SUCCESS, payload: response.data });
  } catch (error) {
    let errorMessage = error.message;
    if (error.response && error.response.status === 400 && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    dispatch({ type: FETCH_CONTRACT_FAILURE, payload: errorMessage });
    console.error('Ошибка при создании контракта:', error);
  }
};

export const updateContract = (contractId, updatedContractData) => async (dispatch) => {
  dispatch({ type: FETCH_CONTRACT });

  try {
    const response = await axios.put(`${hostServer}contract/${contractId}`, { execution_date: updatedContractData.execution_date });
    dispatch({ type: UPDATE_CONTRACT_SUCCESS, payload: response.data });
    return Promise.resolve();
  } catch (error) {
    console.log(error)
    let errorMessage = 'Ошибка при обновлении контракта';
    if (error.response) {
      if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.status === 404) {
        errorMessage = 'Контракт не найден';
      } else {
        errorMessage = `Ошибка сервера (${error.response.status})`;
      }
    }
    else if (error.request) {
      errorMessage = 'Запрос не был отправлен';
    } else {
      errorMessage = error.message;
    }
    dispatch({ type: FETCH_CONTRACT_FAILURE, payload: errorMessage });
    return Promise.reject({ message: errorMessage });
  }
};

export const deleteContract = (contract_number) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CONTRACT });

    const response = await axios.delete(`${hostServer}contract/${contract_number}`);

    if (response.status === 200) {
      dispatch({ type: DELETE_CONTRACT_SUCCESS, payload: contract_number });
    } else {
      throw new Error(response.data.message || 'Ошибка при удалении контракта');
    }
  } catch (error) {
    dispatch({ type: FETCH_CONTRACT_FAILURE, payload: error.message });
    console.log(error);
  }
};

export const sortContracts = (page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_CONTRACT });
  try {
    const response = await axios.get(`${hostServer}contract/sorted?page=${page}&limit=${limit}`);
    dispatch({ type: SORT_CONTRACT_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_CONTRACT_FAILURE, payload: error.message });
  }
};

export const searchContracts = (search, page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_CONTRACT });
  try {

    const response = await axios.get(`${hostServer}contract/search`, {
      params: {
        search,
        page,
        limit,
      },
    });

    dispatch({ type: FIND_CONTRACT_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_CONTRACT_FAILURE, payload: error.message });
    console.error('Ошибка при поиске контрактов:', error);
  }
};