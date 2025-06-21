import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

type UserFields = 'name' | 'lastname' | 'email' | 'phone' | 'address' | 'city' | 'state' | 'country';

export type User = Record<UserFields, string>;

interface DefaultStates {
    isAuthenticated: boolean,
    error: boolean,
    user: User
}

const initialState: DefaultStates = {
    isAuthenticated: false,
    error: false,
    user: {
        name: "John",
        lastname: "Doe",
        email: "johndoe@novashop.com",
        phone: "123-456-7890",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        country: "USA",
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setError: (state, action: PayloadAction<boolean>) => {
            state.error = action.payload;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    }
})

export const login = (email: string, password: string) => (dispatch: AppDispatch) => {
  if (email === "johndoe123@novashop.com" && password === "password123") {
    localStorage.setItem("isAuthenticated", "true");
    dispatch(setIsAuthenticated(true));
    dispatch(setError(false));
    return true;
  } else {
    dispatch(setError(true));
    return false;
  }
};

export const logout = () => (dispatch: AppDispatch) => {
    localStorage.removeItem('isAuthenticated');
    dispatch(setIsAuthenticated(false));
}

export const { setIsAuthenticated, setUser, setError } = authSlice.actions

export default authSlice.reducer