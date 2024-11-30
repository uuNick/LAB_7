import { FETCH_FURNITURE, FETCH_FURNITURE_SUCCESS, FETCH_FURNITURE_FAILURE, FETCH_ALL_FURNITURE, FETCH_ALL_FURNITURE_SUCCESS } from '../actionTypes';

const initialState = {
  furniture: [],
  allFurniture: [],
  total: 0,
  currentPage: 1,
  totalPages: 0,
  limit: 10,
  loading: true,
  error: null,
};

const furnitureSlice = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FURNITURE:
    case FETCH_ALL_FURNITURE:
      return { ...state, loading: true, error: null };
    case FETCH_FURNITURE_SUCCESS:
      return {
        ...state,
        furniture: action.payload.data,
        total: action.payload.total,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.pages,
        loading: false,
        error: null,
      };
    case FETCH_ALL_FURNITURE_SUCCESS:
      return { ...state, loading: false, allFurniture: action.payload, error: null };
    case FETCH_FURNITURE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default furnitureSlice;