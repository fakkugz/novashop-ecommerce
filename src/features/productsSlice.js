import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    return res.data;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const res = await axios.get('https://fakestoreapi.com/products/categories');
    return res.data;
  }
);

const initialState = {
  allProducts: [],
  filteredProducts: [],
  categories: [],
  currentPage: 1,
  productsPerPage: 12,
  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setCurrentPage: (state, action) => {
        state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.filteredProducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = 'No se pudieron cargar los productos';
      })

      // fetchCategories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.error = 'No se pudieron cargar las categorías';
      });
  },
});

export const { setFilteredProducts, setCurrentPage } = productsSlice.actions;

export const selectFilteredProducts = state => state.products.filteredProducts;
export const selectCurrentPage = state => state.products.currentPage;
export const selectProductsPerPage = state => state.products.productsPerPage;

export const selectCurrentProducts = createSelector(
  [selectFilteredProducts, selectCurrentPage, selectProductsPerPage],
  (filteredProducts, currentPage, productsPerPage) => {
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    return filteredProducts.slice(indexOfFirst, indexOfLast);
  }
);

export const selectTotalPages = (state) => {
  const { filteredProducts, productsPerPage } = state.products;
  return Math.ceil(filteredProducts.length / productsPerPage);
};

export default productsSlice.reducer;
