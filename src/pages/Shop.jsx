import { useState, useEffect } from "react";
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import ItemCard from "../components/ItemCard";
import FiltersDrawer from "../components/FiltersDrawer";
import AddedToCart from "../components/AddedToCart";
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredProducts, setCurrentPage, selectCurrentProducts, selectTotalPages } from '../features/productsSlice';
import { setLastAddedProduct, setAddToCartOpenModal } from "../features/uiSlice";
import { applyFilters } from '../thunks/productThunk';


const Shop = () => {

    const dispatch = useDispatch();

    const { loading, allProducts, filteredProducts, currentPage, productsPerPage } = useSelector((state) => state.products);

    const { favorites, showOnlyFavorites, activeFilters, priceFilter, rateFilter } = useSelector((state) => state.filters);

    const currentProducts = useSelector(selectCurrentProducts);
    const totalPages = useSelector(selectTotalPages);


    useEffect(() => {
        dispatch(setFilteredProducts(allProducts));
    }, [dispatch, allProducts]);

    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(setCurrentPage(1));
    }, [dispatch]);

    const handlePageChange = (event, value) => {
        dispatch(setCurrentPage(value));
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        dispatch(applyFilters());
    }, [dispatch, allProducts, activeFilters, priceFilter, rateFilter, showOnlyFavorites, favorites]);

    useEffect(() => {
        const maxPage = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage > maxPage && maxPage > 0) {
            dispatch(setCurrentPage(1));
        }
    }, [dispatch, filteredProducts, currentPage, productsPerPage]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAddToCartSuccess = (product) => {
        dispatch(setLastAddedProduct(product));
        dispatch(setAddToCartOpenModal(true));
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
                                    sx={{ bgcolor: 'rgb(59, 59, 59)' }} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 3, sm: 6 } }}>
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
                                align="center"
                                sx={{
                                    width: '100%',
                                    color: 'gray',
                                    fontStyle: 'italic',
                                    fontWeight: 500,
                                    mt: 5
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
                onClose={() => setAddToCartOpenModal(false)}
            />
        </Box>
    );
};

export default Shop;