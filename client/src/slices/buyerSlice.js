import { FETCH_BUYER, FETCH_BUYER_SUCCESS, FETCH_BUYER_FAILURE, FETCH_BUYER_BY_ID, FETCH_BUYER_BY_ID_SUCCESS, FETCH_ALL_BUYERS, FETCH_ALL_BUYERS_SUCCESS } from '../actionTypes';

const initialState = {
    buyer: [],
    allBuyers: [],
    selectedBuyer: null,
    total: 0,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    loading: true,
    error: null,
};

const buyerSlice = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BUYER:
        case FETCH_BUYER_BY_ID:
        case FETCH_ALL_BUYERS:
            return { ...state, loading: true, error: null };
        case FETCH_BUYER_SUCCESS:
            return {
                ...state,
                buyer: action.payload.data,
                total: action.payload.total,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.pages,
                loading: false,
                error: null,
            };
        case FETCH_BUYER_BY_ID_SUCCESS:
            return { ...state, loading: false, selectedBuyer: action.payload, error: null };
        case FETCH_ALL_BUYERS_SUCCESS:
            return {...state, loading: false, allBuyers: action.payload, error: null};
        case FETCH_BUYER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default buyerSlice;