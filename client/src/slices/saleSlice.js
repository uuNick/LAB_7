import {
  FETCH_SALE,
  FETCH_SALE_SUCCESS,
  FETCH_SALE_FAILURE,
  DELETE_SALE_SUCCESS,
  SORT_SALE_SUCCESS,
  FIND_SALE_SUCCESS
} from '../actionTypes';

const initialState = {
  sale: [],
  sortedSale: [],
  findSale: [],
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
      return handlePagination(state, action.payload, 'sale');
    case DELETE_SALE_SUCCESS:
      return {
        ...state,
        loading: false,
        sale: state.sale.filter(item => item.id !== action.payload),
        error: null,
      };
    case SORT_SALE_SUCCESS:
      return handlePagination(state, action.payload, 'sortedSale');
    case FIND_SALE_SUCCESS:
      return handlePagination(state, action.payload, 'findSale');
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

const handlePagination = (state, payload, dataKey) => ({
  ...state,
  [dataKey]: payload.data,
  total: payload.total,
  currentPage: payload.currentPage,
  totalPages: payload.pages,
  loading: false,
  error: null,
});

export default saleSlice;