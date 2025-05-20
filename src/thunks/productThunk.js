import { setFilteredProducts } from '../features/productsSlice';

export const applyFilters = () => (dispatch, getState) => {
  const { products, filters } = getState();
  const { allProducts } = products;
  const {
    activeFilters,
    priceFilter,
    rateFilter,
    showOnlyFavorites,
    favorites,
  } = filters;

  let filtered = allProducts;

  if (activeFilters.length > 0) {
    filtered = filtered.filter(product =>
      activeFilters.includes(product.category)
    );
  }

  if (priceFilter.min != null && priceFilter.max != null) {
    filtered = filtered.filter(product =>
      product.price >= priceFilter.min && product.price <= priceFilter.max
    );
  }

  if (rateFilter.min != null && rateFilter.max != null) {
    filtered = filtered.filter(product =>
      product.rating.rate >= rateFilter.min && product.rating.rate <= rateFilter.max
    );
  }

  if (showOnlyFavorites) {
    const favoriteTitles = favorites.map(fav => fav.title);
    filtered = filtered.filter(product =>
      favoriteTitles.includes(product.title)
    );
  }

  dispatch(setFilteredProducts(filtered));
};
