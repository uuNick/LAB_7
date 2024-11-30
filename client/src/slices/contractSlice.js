import { FETCH_CONTRACT, FETCH_CONTRACT_SUCCESS, FETCH_CONTRACT_FAILURE } from '../actionTypes';

const initialState = {
  contract: [],
  total: 0,
  currentPage: 1,
  totalPages: 0,
  limit: 10,
  loading: true, 
  error: null,
};

const contractSlice = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTRACT:
      return { ...state, loading: true, error: null };
    case FETCH_CONTRACT_SUCCESS:
      return {
        ...state,
        contract: action.payload.data,
        total: action.payload.total,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.pages,
        loading: false,
        error: null,
      };
    case FETCH_CONTRACT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default contractSlice;