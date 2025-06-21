import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';

type NumberRange = { min: number, max: number}

interface DefaultStates {
    activeFilters: string[],
    favorites: Product[],
    showOnlyFavorites: boolean,
    priceFilter: NumberRange,
    rateFilter: NumberRange,
    min: string,
    max: string,
    rateRange: [number, number]
}

const initialState: DefaultStates = {
    activeFilters: [],
    favorites: (() => {
        try {
            return JSON.parse(localStorage.getItem("favorites") || '[]') as Product[];
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
        setActiveFilters: (state, action: PayloadAction<string[]>) => {
            state.activeFilters = action.payload;
        },
        setFavorites: (state, action: PayloadAction<Product[]>) => {
            state.favorites = action.payload;
        },
        setShowOnlyFavorites: (state, action: PayloadAction<boolean>) => {
            state.showOnlyFavorites = action.payload;
        },
        setPriceFilter: (state, action: PayloadAction<NumberRange>) => {
            state.priceFilter = action.payload;
        },
        setRateFilter: (state, action: PayloadAction<NumberRange>) => {
            state.rateFilter = action.payload;
        },
        setMin: (state, action: PayloadAction<string>) => {
            state.min = action.payload;
        },
        setMax: (state, action: PayloadAction<string>) => {
            state.max = action.payload;
        },
        setRateRange: (state, action: PayloadAction<[number, number]>) => {
            state.rateRange = action.payload;
        }
    }
});

export const { setFavorites, setShowOnlyFavorites, setPriceFilter, setRateFilter,
               setMin, setMax, setRateRange, setActiveFilters } = filterSlice.actions;

export default filterSlice.reducer;