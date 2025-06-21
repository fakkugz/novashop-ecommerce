import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../features/productsSlice';

interface DefaultStates {
    lastAddedProduct: null | Product,
    addToCartOpenModal: boolean
}

const initialState: DefaultStates = {
    lastAddedProduct: null,
    addToCartOpenModal: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLastAddedProduct: (state, action: PayloadAction<Product>) => {
            state.lastAddedProduct = action.payload;
        },
        setAddToCartOpenModal: (state, action: PayloadAction<boolean>) => {
            state.addToCartOpenModal = action.payload;
        }
    }
});

export const { setLastAddedProduct, setAddToCartOpenModal } = uiSlice.actions;

export default uiSlice.reducer;