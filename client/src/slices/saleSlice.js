import { FETCH_SALE, FETCH_SALE_SUCCESS, FETCH_SALE_FAILURE } from '../actionTypes';

const initialState = {
  sale: [],
  total: 0,
  currentPage: 1,
  totalPages: 0,
  limit: 10,
  loading: true,
  error: null,
};

const saleSlice = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SALE:
      return { ...state, loading: true, error: null };
    case FETCH_SALE_SUCCESS:
      return {
        ...state,
        sale: action.payload.data,
        total: action.payload.total,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.pages,
        loading: false,
        error: null,
      };
    case FETCH_SALE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default saleSlice;