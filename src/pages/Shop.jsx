import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Drawer, Box, Typography, Button, Skeleton, Pagination } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ItemCard from "../components/ItemCard";
import { Grid } from '@mui/material';
import FiltersDrawer from "../components/FiltersDrawer";
import AddedToCart from "../components/AddedToCart";

const Shop = ({ loading }) => {

    const { allProducts, favorites, showOnlyFavorites,
            activeFilters, priceFilter, rateFilter,
            filteredProducts, setFilteredProducts,
            lastAddedProduct, setLastAddedProduct,
            addToCartOpenModal, setAddToCartOpenModal,
            currentPage, setCurrentPage,
            productsPerPage, currentProducts  } = useContext(ShopContext);

    const [mobileOpen, setMobileOpen] = useState(false);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    useEffect(() => {
        window.scrollTo(0, 0);
        setCurrentPage(1);
      }, []);
           
      const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo(0, 0);
    };
    
    useEffect(() => {
        let filtered = allProducts;

        if (activeFilters.length > 0) {
          filtered = filtered.filter(p => activeFilters.includes(p.category));
        }
      
        if (priceFilter.min !== null && priceFilter.max !== null) {
          filtered = filtered.filter(p => p.price >= priceFilter.min && p.price <= priceFilter.max);
        }
      
        if (rateFilter.min !== null && rateFilter.max !== null) {
          filtered = filtered.filter(p => p.rating.rate >= rateFilter.min && p.rating.rate <= rateFilter.max);
        }
      
        if (showOnlyFavorites) {
          const favTitles = favorites.map(f => f.title);
          filtered = filtered.filter(p => favTitles.includes(p.title));
        }
      
        setFilteredProducts(filtered);
      }, [allProducts, activeFilters, priceFilter, rateFilter, showOnlyFavorites, favorites]);
      
    useEffect(() => {
    if (filteredProducts.length === 0 || currentPage > Math.ceil(filteredProducts.length / productsPerPage)) {
        setCurrentPage(1);
    }
    }, [filteredProducts, currentPage, productsPerPage]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAddToCartSuccess = (product) => {
        setLastAddedProduct(product);
        setAddToCartOpenModal(true);
      };

      if (loading) {
        return (
            <Box sx={{ p: 6 }}>
                <Grid container spacing={2}>
                    {[...Array(8)].map((_, index) => (
                        <Grid size={{ xs: 6, md: 3 }} key={index}>
                            <Box sx={{ padding: 0 }}>
                                <Skeleton variant="rectangular"
                                          width="100%"
                                          height={500}
                                          animation="wave"
                                          sx={{ bgcolor: 'rgb(59, 59, 59)' }}/>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    return (
        <Box sx={{ p: {xs: 3, sm: 6} }}>
            {/* Botón para abrir Drawer en mobile */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<MenuIcon />}
                    onClick={handleDrawerToggle}
                    sx={{ backgroundColor: 'secondary.light' }}
                >
                    Filters
                </Button>
            </Box>

            <Grid container spacing={2} sx={{ height: '100%', alignItems: 'flex-start' }}>
                {/* Sidebar fijo para desktop */}
                <Grid size={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <FiltersDrawer />
                </Grid>

                {/* Productos */}
                <Grid size={{ xs: 12, md: 9 }}>
                    
                    <Grid container spacing={2} key={activeFilters.join('-')} >
                        {loading ? (
                                [...Array(6)].map((_, index) => (
                                    <Grid size={{ xs: 6, sm: 4 }} key={index}>
                                        <Box sx={{ padding: 2 }}>
                                            <Skeleton variant="rectangular" width="100%" height={200} />
                                        </Box>
                                    </Grid>
                                ))
                        ) : currentProducts.length > 0 ? (
                            currentProducts.map((i) => (
                                <Grid size={{ xs: 6, sm: 4 }} key={i.id} sx={{
                                    opacity: 0,
                                    animation: 'fadeIn 0.3s ease forwards',
                                    animationDelay: `${0.03 * i.id}s`,
                                }}>
                                    <ItemCard
                                        id={i.id}
                                        title={i.title}
                                        price={i.price}
                                        description={i.description}
                                        category={i.category}
                                        image={i.image}
                                        rate={i.rating.rate}
                                        onAddToCartSuccess={handleAddToCartSuccess}
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'gray',
                                    fontStyle: 'italic',
                                    fontWeight: 500
                                }}
                            >
                                No products found
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>

            {/* Paginación */}
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination
                        count={Math.ceil(filteredProducts.length / productsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: 'white',
                            },
                            '& .Mui-selected': {
                                backgroundColor: 'primary.main', 
                                color: 'white', 
                                border: '1px solid white', 
                                outline: 'none', 
                            },
                            '& .MuiPaginationItem-root:focus': {
                                outline: 'none', 
                            },
                        }}
                    />
                </Box>
            
            )}

            {/* Drawer en mobile */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { width: 240 },
                }}
            >
                <FiltersDrawer />
            </Drawer>
            <AddedToCart
                open={addToCartOpenModal}
                product={lastAddedProduct}
                onClose={() => setAddToCartOpenModal(false)}
            />
        </Box>
    );
};

export default Shop;