import axios from 'axios';
import {
  FETCH_FURNITURE,
  FETCH_FURNITURE_SUCCESS,
  FETCH_FURNITURE_FAILURE,
  FETCH_ALL_FURNITURE_SUCCESS,
  CREATE_FURNITURE_SUCCESS
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

    const response = await fetch(`${hostServer}furnitureModel/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(furnitureModelData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Ошибка при создании модели мебели';
      throw new Error(errorMessage);
    }

    const data = await response.json();
    dispatch({ type: CREATE_FURNITURE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_FURNITURE_FAILURE, payload: error.message });
    console.error('Ошибка при создании модели мебели:', error);
  }
};