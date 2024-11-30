import { configureStore } from '@reduxjs/toolkit';
import furnitureSlice from './slices/furnitureSlice';
import contractSlice from './slices/contractSlice';
import buyerSlice from './slices/buyerSlice';
import saleSlice from './slices/saleSlice';

const store = configureStore({
    reducer: {
        furnitureModels: furnitureSlice,
        contract: contractSlice,
        buyer: buyerSlice,
        sale: saleSlice,
    },
});

export default store;
