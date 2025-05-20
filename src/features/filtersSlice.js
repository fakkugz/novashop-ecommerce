import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeFilters: [],
    favorites: (() => {
        try {
            const savedFavorites = localStorage.getItem('favorites');
            return savedFavorites ? JSON.parse(savedFavorites) : [];
        } catch (error) {
            console.error("Error parsing favorites from localStorage:", error);
            return [];
        }
    })(),
    showOnlyFavorites: false,
    priceFilter: { min: 0, max: Infinity },
    rateFilter: { min: 1, max: 5 },
    min: '',
    max: '',
    rateRange: [1, 5],
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setActiveFilters: (state, action) => {
            state.activeFilters = action.payload;
        },
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        },
        setShowOnlyFavorites: (state, action) => {
            state.showOnlyFavorites = action.payload;
        },
        setPriceFilter: (state, action) => {
            state.priceFilter = action.payload;
        },
        setRateFilter: (state, action) => {
            state.rateFilter = action.payload;
        },
        setMin: (state, action) => {
            state.min = action.payload;
        },
        setMax: (state, action) => {
            state.max = action.payload;
        },
        setRateRange: (state, action) => {
            state.rateRange = action.payload;
        }
    }
});

export const { setFavorites, setShowOnlyFavorites, setPriceFilter, setRateFilter,
               setMin, setMax, setRateRange, setActiveFilters } = filterSlice.actions;

export default filterSlice.reducer;