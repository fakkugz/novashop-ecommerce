import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lastAddedProduct: null,
    addToCartOpenModal: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLastAddedProduct: (state, action) => {
            state.lastAddedProduct = action.payload;
        },
        setAddToCartOpenModal: (state, action) => {
            state.addToCartOpenModal = action.payload;
        }
    }
});

export const { setLastAddedProduct, setAddToCartOpenModal } = uiSlice.actions;

export default uiSlice.reducer;