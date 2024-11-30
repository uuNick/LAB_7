import axios from 'axios';
import { FETCH_CONTRACT, FETCH_CONTRACT_SUCCESS, FETCH_CONTRACT_FAILURE } from '../../actionTypes';
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