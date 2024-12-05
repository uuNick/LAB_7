import axios from 'axios';
import {
  FETCH_BUYER,
  FETCH_BUYER_SUCCESS,
  FETCH_BUYER_FAILURE,
  FETCH_BUYER_BY_ID_SUCCESS,
  FETCH_ALL_BUYERS_SUCCESS,
  CREATE_BUYER_SUCCESS,
  UPDATE_BUYER_SUCCESS,
  DELETE_BUYER_SUCCESS,
  SORT_BUYER_SUCCESS,
  FIND_BUYER_SUCCESS
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

    const response = await axios.post(`${hostServer}buyer/`, buyerData);

    if (!response.data) {
      throw new Error('Ошибка при создании покупателя: Сервер вернул пустой ответ.');
    }

    if (response.status >= 400) {
      const errorMessage = response.data.message || "Ошибка при создании покупателя";
      throw new Error(errorMessage);
    }

    dispatch({ type: CREATE_BUYER_SUCCESS, payload: response.data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Ошибка при создании покупателя';
    dispatch({ type: FETCH_BUYER_FAILURE, payload: errorMessage });
    console.error('Ошибка при создании покупателя:', error);
  }
};

export const updateBuyer = (buyerId, updatedBuyerData) => async (dispatch) => {
  dispatch({ type: FETCH_BUYER });

  try {
    const response = await axios.put(`${hostServer}buyer/${buyerId}`, updatedBuyerData);
    dispatch({ type: UPDATE_BUYER_SUCCESS, payload: response.data });
    return Promise.resolve();
  } catch (error) {
    let errorMessage = 'Ошибка при обновлении покупателя';
    if (error.response) {
      if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.status === 404) {
        errorMessage = 'Покупатель не найден';
      } else {
        errorMessage = `Ошибка сервера (${error.response.status})`;
      }
    }
    else if (error.request) {
      errorMessage = 'Запрос не был отправлен';
    } else {
      errorMessage = error.message;
    }
    dispatch({ type: FETCH_BUYER_FAILURE, payload: errorMessage });
    return Promise.reject({ message: errorMessage });
  }
};

export const deleteBuyer = (buyer_id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BUYER });

    const response = await axios.delete(`${hostServer}buyer/${buyer_id}`);

    if (response.status === 200) {
      dispatch({ type: DELETE_BUYER_SUCCESS, payload: buyer_id });
    } else {
      throw new Error(response.data.message || 'Ошибка при удалении покупателя');
    }
  } catch (error) {
    dispatch({ type: FETCH_BUYER_FAILURE, payload: error.message });
    console.log(error);
  }
};

export const sortBuyers = (page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_BUYER });
  try {
    const response = await axios.get(`${hostServer}buyer/sorted?page=${page}&limit=${limit}`);
    dispatch({ type: SORT_BUYER_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_BUYER_FAILURE, payload: error.message });
  }
};

export const searchBuyers = (search, page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_BUYER });
  try {

    const response = await axios.get(`${hostServer}buyer/search`, {
      params: {
        search,
        page,
        limit,
      },
    });

    dispatch({ type: FIND_BUYER_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_BUYER_FAILURE, payload: error.message });
    console.error('Ошибка при поиске покупателей:', error);
  }
};