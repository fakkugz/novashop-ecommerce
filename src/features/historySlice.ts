import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../features/productsSlice';
import { RootState, AppDispatch } from '../store';

interface DefaultStates {
    lastVisited: Product[],
    lastPurchased: Product[]
}

const initialState: DefaultStates = {
    lastVisited: (() => {
        try {
            return JSON.parse(localStorage.getItem("lastVisited") || '[]') as Product[];
         } catch (error) {
            console.error("Error parsing lastVisited from localStorage:", error);
            return [];
        }
    })(),
    lastPurchased: (() => {
        try {
            return JSON.parse(localStorage.getItem("lastPurchased") || '[]') as Product[];
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
        setLastVisited: (state, action: PayloadAction<Product[]>) => {
            state.lastVisited = action.payload;
        },
        setLastPurchased: (state, action: PayloadAction<Product[]>) => {
            state.lastPurchased = action.payload;
        },
    }
})

export const updateLastVisited = (product: Product) => (dispatch: AppDispatch, getState: () => RootState) => {
  const { history } = getState();
  const updatedList = [product, ...history.lastVisited.filter((p: Product) => p.id !== product.id)].slice(0, 10);

  localStorage.setItem("lastVisited", JSON.stringify(updatedList));
  dispatch(setLastVisited(updatedList));
};

export const updateLastPurchased = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const { cart, history } = getState();

  if (cart.length === 0) return;

  const filteredPrev = history.lastPurchased.filter(
    item => !cart.some((p: Product) => p.id === item.id)
  );

  const updatedList = [...cart, ...filteredPrev].slice(0, 10);

  localStorage.setItem("lastPurchased", JSON.stringify(updatedList));
  dispatch(setLastPurchased(updatedList));
};

export const { setLastVisited, setLastPurchased } = historySlice.actions;

export default historySlice.reducer;