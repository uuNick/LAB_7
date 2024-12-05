import {
    FETCH_BUYER,
    FETCH_BUYER_SUCCESS,
    FETCH_BUYER_FAILURE,
    FETCH_BUYER_BY_ID_SUCCESS,
    FETCH_ALL_BUYERS_SUCCESS,
    CREATE_BUYER_SUCCESS,
    UPDATE_BUYER_SUCCESS,
    DELETE_BUYER_SUCCESS,
    SORT_BUYER_SUCCESS,
    FIND_BUYER_SUCCESS
} from '../actionTypes';

const initialState = {
    buyer: [],
    allBuyers: [],
    selectedBuyer: null,
    sortedBuyer: [],
    findBuyer: [],
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
            return { ...state, loading: true, error: null };
        case FETCH_BUYER_SUCCESS:
            return handlePagination(state, action.payload, 'buyer');
        case FETCH_BUYER_BY_ID_SUCCESS:
            return { ...state, loading: false, selectedBuyer: action.payload, error: null };
        case FETCH_ALL_BUYERS_SUCCESS:
            return { ...state, loading: false, allBuyers: action.payload, error: null };
        case CREATE_BUYER_SUCCESS:
            return {
                ...state,
                allBuyers: [...state.allBuyers, action.payload],
                loading: false,
                error: null,
            };

        case UPDATE_BUYER_SUCCESS:
            const updatedBuyers = state.allBuyers.map((buyer) =>
                buyer.buyer_id === action.payload.buyer_id ? action.payload : buyer
            );
            return {
                ...state,
                allBuyers: updatedBuyers,
                loading: false,
                error: null,
            };
        case DELETE_BUYER_SUCCESS:
            return {
                ...state,
                loading: false,
                buyer: state.buyer.filter(item => item.buyer_id !== action.payload),
                error: null,
            };
        case SORT_BUYER_SUCCESS:
            return handlePagination(state, action.payload, 'sortedBuyer');
        case FIND_BUYER_SUCCESS:
            return handlePagination(state, action.payload, 'findBuyer');
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

const handlePagination = (state, payload, dataKey) => ({
    ...state,
    [dataKey]: payload.data,
    total: payload.total,
    currentPage: payload.currentPage,
    totalPages: payload.pages,
    loading: false,
    error: null,
});

export default buyerSlice;