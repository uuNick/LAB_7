import axios from 'axios';
import {
  FETCH_SALE,
  FETCH_SALE_SUCCESS,
  FETCH_SALE_FAILURE,
  CREATE_SALE_SUCCESS,
  UPDATE_SALE_SUCCESS,
  DELETE_SALE_SUCCESS,
  SORT_SALE_SUCCESS,
  FIND_SALE_SUCCESS

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

    const response = await axios.post(`${hostServer}sale/`, saleData);

    if (!response.data) {
      throw new Error('Ошибка при создании продажи: Ответ сервера не содержит данных.');
    }

    if (response.status === 400) {
      let errorMessage = response.data.message || 'Ошибка при создании продажи';
      if (errorMessage.includes('Контракт')) {
        errorMessage = 'Контракт с указанным номером не существует';
      } else if (errorMessage.includes('Мебель')) {
        errorMessage = 'Мебель с указанным ID не существует';
      }
      throw new Error(errorMessage);
    }

    dispatch({ type: CREATE_SALE_SUCCESS, payload: response.data });
  } catch (error) {
    let errorMessage = error.message;
    if (error.response && error.response.status === 400 && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    dispatch({ type: FETCH_SALE_FAILURE, payload: errorMessage });
    console.error('Ошибка при создании продажи:', error);
  }
};

export const updateSale = (saleId, updatedSaleData) => async (dispatch) => {
  dispatch({ type: FETCH_SALE });

  try {
    const response = await axios.put(`${hostServer}sale/${saleId}`, updatedSaleData);
    dispatch({ type: UPDATE_SALE_SUCCESS, payload: response.data });
    return Promise.resolve();
  } catch (error) {
    let errorMessage = 'Ошибка при обновлении продажи';
    if (error.response) {
      if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.status === 404) {
        errorMessage = 'Продажа не найдена';
      } else {
        errorMessage = `Ошибка сервера (${error.response.status})`;
      }
    }
    else if (error.request) {
      errorMessage = 'Запрос не был отправлен';
    } else {
      errorMessage = error.message;
    }
    dispatch({ type: FETCH_SALE_FAILURE, payload: errorMessage });
    return Promise.reject({ message: errorMessage });
  }
};

export const deleteSale = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SALE });

    const response = await axios.delete(`${hostServer}sale/${id}`);

    if (response.status === 200) {
      dispatch({ type: DELETE_SALE_SUCCESS, payload: id });
    } else {
      throw new Error(response.data.message || 'Ошибка при удалении покупателя');
    }
  } catch (error) {
    dispatch({ type: FETCH_SALE_FAILURE, payload: error.message });
    console.log(error);
  }
};

export const sortSales = (page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_SALE });
  try {
    const response = await axios.get(`${hostServer}sale/sorted?page=${page}&limit=${limit}`);
    dispatch({ type: SORT_SALE_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_SALE_FAILURE, payload: error.message });
  }
};

export const searchSales = (search, page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_SALE });
  try {

    const response = await axios.get(`${hostServer}sale/search`, {
      params: {
        search,
        page,
        limit,
      },
    });

    dispatch({ type: FIND_SALE_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_SALE_FAILURE, payload: error.message });
    console.error('Ошибка при поиске продажи:', error);
  }
};