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
} from '../actionTypes';

const initialState = {
  furniture: [],
  allFurniture: [],
  sortedFurniture: [],
  findFurniture: [],
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
      return { ...state, loading: true, error: null };
    case FETCH_FURNITURE_SUCCESS:
      return handlePagination(state, action.payload, 'furniture');
    case FETCH_ALL_FURNITURE_SUCCESS:
      return { ...state, loading: false, allFurniture: action.payload, error: null };
    case CREATE_FURNITURE_SUCCESS:
      return {
        ...state,
        allFurniture: [...state.allFurniture, action.payload],
        loading: false,
        error: null,
      };

    case UPDATE_FURNITURE_SUCCESS:
      const updatedFurniture = state.allFurniture.map((furniture) =>
        furniture.furniture_model_id === action.payload.furniture_model_id ? action.payload : furniture
      );
      return {
        ...state,
        allFurniture: updatedFurniture,
        loading: false,
        error: null,
      };

    case DELETE_FURNITURE_SUCCESS:
      return {
        ...state,
        loading: false,
        furniture: state.furniture.filter(item => item.furniture_model_id !== action.payload),
        error: null,
      };

    case SORT_FURNITURE_SUCCESS:
      return handlePagination(state, action.payload, 'sortedFurniture');
    case FIND_FURNITURE_SUCCESS:
      return handlePagination(state, action.payload, 'findFurniture');
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

const handlePagination = (state, payload, dataKey) => ({
  ...state,
  [dataKey]: payload.data,
  total: payload.total,
  currentPage: payload.currentPage,
  totalPages: payload.pages,
  loading: false,
  error: null,
});

export default furnitureSlice;