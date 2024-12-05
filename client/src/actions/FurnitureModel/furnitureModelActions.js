import axios from 'axios';
import {
  FETCH_FURNITURE,
  FETCH_FURNITURE_SUCCESS,
  FETCH_FURNITURE_FAILURE,
  FETCH_ALL_FURNITURE_SUCCESS,
  CREATE_FURNITURE_SUCCESS,
  UPDATE_FURNITURE_SUCCESS,
  DELETE_FURNITURE_SUCCESS,
  SORT_FURNITURE_SUCCESS,
  FIND_FURNITURE_SUCCESS
} from '../../actionTypes';
import hostServerJSON from "../hostServer.json";
const hostServer = hostServerJSON.path;

export const fetchFurniture = (page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_FURNITURE });
  try {
    const response = await axios.get(`${hostServer}furnitureModel/?page=${page}&limit=${limit}`);
    dispatch({ type: FETCH_FURNITURE_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_FURNITURE_FAILURE, payload: error.message });
  }
};

export const fetchAllFurnitureModels = () => async (dispatch) => {
  dispatch({ type: FETCH_FURNITURE });
  try {
    const response = await axios.get(`${hostServer}furnitureModel/withoutPag`);
    dispatch({ type: FETCH_ALL_FURNITURE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_FURNITURE_FAILURE, payload: error.message });
  }
}

export const createFurnitureModel = (furnitureModelData) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_FURNITURE }); 

    const response = await axios.post(`${hostServer}furnitureModel/`, furnitureModelData);

    if (!response.data) {
      throw new Error('Ошибка при создании мебели: Сервер вернул пустой ответ.');
    }

    if (response.status >= 400) {
      const errorMessage = response.data.message || "Ошибка при создании мебели";
      throw new Error(errorMessage);
    }

    dispatch({ type: CREATE_FURNITURE_SUCCESS, payload: response.data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Ошибка при создании мебели';
    dispatch({ type: FETCH_FURNITURE_FAILURE, payload: errorMessage });
    console.error('Ошибка при создании модели мебели:', error);
  }
};

export const updateFurniture = (furnitureId, updatedFurnitureData) => async (dispatch) => {
  dispatch({ type: FETCH_FURNITURE });

  try {
    const response = await axios.put(`${hostServer}furnitureModel/${furnitureId}`, updatedFurnitureData);
    dispatch({ type: UPDATE_FURNITURE_SUCCESS, payload: response.data });
    return Promise.resolve();
  } catch (error) {
    let errorMessage = 'Ошибка при обновлении мебели';
    if (error.response) {
      if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.status === 404) {
        errorMessage = 'Мебель не найдена';
      } else {
        errorMessage = `Ошибка сервера (${error.response.status})`;
      }
    }
    else if (error.request) {
      errorMessage = 'Запрос не был отправлен';
    } else {
      errorMessage = error.message;
    }
    dispatch({ type: FETCH_FURNITURE_FAILURE, payload: errorMessage });
    return Promise.reject({ message: errorMessage });
  }
};

export const deleteFurniture = (furniture_id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_FURNITURE });

    const response = await axios.delete(`${hostServer}furnitureModel/${furniture_id}`);

    if (response.status === 200) {
      dispatch({ type: DELETE_FURNITURE_SUCCESS, payload: furniture_id });
    } else {
      throw new Error(response.data.message || 'Ошибка при удалении мебели');
    }
  } catch (error) {
    dispatch({ type: FETCH_FURNITURE_FAILURE, payload: error.message });
    console.log(error);
  }
};

export const sortFurnitures = (page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_FURNITURE });
  try {
    const response = await axios.get(`${hostServer}furnitureModel/sorted?page=${page}&limit=${limit}`);
    dispatch({ type: SORT_FURNITURE_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_FURNITURE_FAILURE, payload: error.message });
  }
};

export const searchFurnitures = (search, page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_FURNITURE });
  try {

    const response = await axios.get(`${hostServer}furnitureModel/search`, {
      params: {
        search,
        page,
        limit,
      },
    });

    dispatch({ type: FIND_FURNITURE_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_FURNITURE_FAILURE, payload: error.message });
    console.error('Ошибка при поиске мебели:', error);
  }
};