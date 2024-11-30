import axios from 'axios';
import { FETCH_SALE, FETCH_SALE_SUCCESS, FETCH_SALE_FAILURE } from '../../actionTypes';
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