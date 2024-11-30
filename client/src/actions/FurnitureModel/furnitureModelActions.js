import axios from 'axios';
import { FETCH_FURNITURE, FETCH_FURNITURE_SUCCESS, FETCH_FURNITURE_FAILURE, FETCH_ALL_FURNITURE, FETCH_ALL_FURNITURE_SUCCESS } from '../../actionTypes';
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
  dispatch({ type: FETCH_ALL_FURNITURE });
  try {
    const response = await axios.get(`${hostServer}furnitureModel/withoutPag`);
    dispatch({ type: FETCH_ALL_FURNITURE_SUCCESS, payload: response.data });
  } catch (error){
    dispatch({ type: FETCH_FURNITURE_FAILURE, payload: error.message });
  }
}