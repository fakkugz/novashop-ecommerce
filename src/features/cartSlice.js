import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: (() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Error parsing cart from localStorage:", error);
            return [];
        }
    })(),
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        addToCart: (state, action) => {
            const product = action.payload;
            const existingProductIndex = state.cart.findIndex((item) => item.id === product.id);
            if (existingProductIndex >= 0) {
                state.cart[existingProductIndex].quantity += 1;
            } else {
                state.cart.push({...product, quantity: 1})
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.cart = state.cart.filter(item => item.id !== productId);
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            quantity <= 0 ?
                state.cart = state.cart.filter(item => item.id !== productId) :
                state.cart = state.cart.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                );
        },
        clearCart: (state, action) => {
            state.cart = [];
        },
    }
});

export const { setCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;