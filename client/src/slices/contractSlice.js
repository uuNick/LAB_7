import {
  FETCH_CONTRACT,
  FETCH_CONTRACT_SUCCESS,
  FETCH_CONTRACT_FAILURE,
  DELETE_CONTRACT_SUCCESS,
  SORT_CONTRACT_SUCCESS,
  FIND_CONTRACT_SUCCESS
} from '../actionTypes';

const initialState = {
  contract: [],
  sortedContract: [],
  findContract: [],
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
      return handlePagination(state, action.payload, 'contract');
    case DELETE_CONTRACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contract: state.contract.filter(item => item.contract_number !== action.payload),
        error: null,
      }
    case SORT_CONTRACT_SUCCESS:
      return handlePagination(state, action.payload, 'sortedContract');
    case FIND_CONTRACT_SUCCESS:
      return handlePagination(state, action.payload, 'findContract');
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

const handlePagination = (state, payload, dataKey) => ({
  ...state,
  [dataKey]: payload.data,
  total: payload.total,
  currentPage: payload.currentPage,
  totalPages: payload.pages,
  loading: false,
  error: null,
});

export default contractSlice;