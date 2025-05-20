import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lastVisited: (() => {
        try {
            return JSON.parse(localStorage.getItem("lastVisited")) || [];
         } catch (error) {
            console.error("Error parsing lastVisited from localStorage:", error);
            return [];
        }
    })(),
    lastPurchased: (() => {
        try {
            const savedLastPurchased = localStorage.getItem("lastPurchased");
            return savedLastPurchased ? JSON.parse(savedLastPurchased) : [];
        } catch(error) {
            console.error("Error parsing lastPurchased from localStorage:", error);
            return [];
        }
    })(),
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setLastVisited: (state, action) => {
            state.lastVisited = action.payload;
        },
        setLastPurchased: (state, action) => {
            state.lastPurchased = action.payload;
        },
    }
})

export const updateLastVisited = (product) => (dispatch, getState) => {
  const { history } = getState();
  const updatedList = [product, ...history.lastVisited.filter(p => p.id !== product.id)].slice(0, 10);

  localStorage.setItem("lastVisited", JSON.stringify(updatedList));
  dispatch(setLastVisited(updatedList));
};

export const updateLastPurchased = () => (dispatch, getState) => {
  const { cart, history } = getState();
  const cartItems = cart.cart;

  if (cartItems.length === 0) return;

  const filteredPrev = history.lastPurchased.filter(
    item => !cartItems.some(p => p.id === item.id)
  );

  const updatedList = [...cartItems, ...filteredPrev].slice(0, 10);

  localStorage.setItem("lastPurchased", JSON.stringify(updatedList));
  dispatch(setLastPurchased(updatedList));
};

export const { setLastVisited, setLastPurchased } = historySlice.actions;

export default historySlice.reducer;