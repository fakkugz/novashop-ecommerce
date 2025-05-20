import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
})

export const login = (email, password) => (dispatch) => {
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

export const logout = () => (dispatch) => {
    localStorage.removeItem('isAuthenticated');
    dispatch(setIsAuthenticated(false));
}

export const { setIsAuthenticated, setUser, setError } = authSlice.actions

export default authSlice.reducer