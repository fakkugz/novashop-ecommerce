import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice';
import filtersReducer from './features/filtersSlice';
import cartReducer from './features/cartSlice';
import uiReducer from './features/uiSlice';
import historyReducer from './features/historySlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    cart: cartReducer,
    ui: uiReducer,
    history: historyReducer,
    auth: authReducer,
  },
});
