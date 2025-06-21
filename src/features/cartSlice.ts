import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';

type Cart = Product & {
    quantity: number;
}

const initialState: Cart[] = (() => {
    try {
        return JSON.parse(localStorage.getItem("cart") || '[]') as Cart[];
    } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        return [];
    }
})();


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (_state, action: PayloadAction<Cart[]>) => {
            return action.payload;
        },
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const existingProductIndex = state.findIndex((item) => item.id === product.id);
            if (existingProductIndex >= 0) {
                state[existingProductIndex].quantity += 1;
            } else {
                state.push({ ...product, quantity: 1 })
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            return state.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ productId: number, quantity: number }>) => {
            const { productId, quantity } = action.payload;
            return quantity <= 0
                ? state.filter(item => item.id !== productId)
                : state.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                );
        },
        clearCart: () => {
            return [];
        },
    }
});

export const { setCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;