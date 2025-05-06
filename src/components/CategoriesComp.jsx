import { Box, Card, CardMedia, CardContent, Typography, Grid, CircularProgress } from "@mui/material";
import { useContext, useState, useEffect, useRef } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { useNavigate } from "react-router-dom";
import imgPlaceholder from '../assets/images/27002.webp'

const CategoriesComp = () => {

    const { allProducts, categories } = useContext(ShopContext);
    const navigate = useNavigate();

    const [categoryImagesState, setCategoryImagesState] = useState({});
    const categoryImageList = useRef({});
    const currentIndexes = useRef({});

    useEffect(() => {
        if (allProducts.length === 0 || categories.length === 0) return;

        const initialState = {};
        const list = {};
        const indexes = {};

        categories.forEach(category => {
            const images = allProducts.filter(p => p.category === category).map(p => p.image);
            if (images.length > 0) {
                list[category] = images;
                indexes[category] = 0;
                initialState[category] = {
                    current: images[0],
                    next: images[0],
                    fading: false,
                    showNext: false
                };
            }
        });

        categoryImageList.current = list;
        currentIndexes.current = indexes;
        setCategoryImagesState(initialState);
    }, [allProducts, categories]);

    useEffect(() => {
        if (categories.length === 0 || allProducts.length === 0) return;

        const interval = setInterval(() => {
            categories.forEach(category => {
                const images = categoryImageList.current[category];
                if (!images || images.length <= 1) return;

                const currentIndex = currentIndexes.current[category];
                const nextIndex = (currentIndex + 1) % images.length;
                const nextImage = images[nextIndex];

                setCategoryImagesState(prev => ({
                    ...prev,
                    [category]: {
                        ...prev[category],
                        next: nextImage,
                        fading: true,
                        showNext: true
                    }
                }));

                setTimeout(() => {
                    currentIndexes.current[category] = nextIndex;
                    setCategoryImagesState(prev => ({
                        ...prev,
                        [category]: {
                            ...prev[category],
                            current: nextImage,
                            fading: false,
                            showNext: false
                        }
                    }));
                }, 500);
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [categories, allProducts]);

    const handleCategoryClick = (category) => {
        navigate(`/shop?category=${encodeURIComponent(category)}`);
    };

    if (allProducts.length === 0) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '90vh',
                flexDirection: 'column',
                backgroundColor: 'transparent',
                mt: '500px'
            }}>
                <CircularProgress sx={{ color: "#FF5733" }} />
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: { xs: 0, md: 4 } }}>
            <Typography
                variant="h4"
                sx={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: { xs: '25px', sm: '35px' }
                }}>
                CATEGORIES
            </Typography>
            <Grid container spacing={2} rowSpacing={{ xs: 2, md: 8 }} sx={{ mt: 4, width: '70%', display: 'flex' }}>
                {categories.map(category => (
                    <Grid size={{ xs: 12, sm: 6 }} key={category} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Card
                            onClick={() => handleCategoryClick(category)}
                            sx={{
                                p: 2,
                                width: 300,
                                cursor: "pointer",
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: "10px",
                                '&:hover': { transform: 'scale(1.05)' },
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    width: '100%',
                                    aspectRatio: '3 / 4'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={categoryImagesState[category]?.current || imgPlaceholder}
                                    alt={category}
                                    loading="lazy"
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        opacity: categoryImagesState[category]?.showNext ? 0 : 1,
                                        transition: "opacity 0.5s ease-in-out",
                                    }}
                                />
                                <CardMedia
                                    component="img"
                                    image={categoryImagesState[category]?.next || imgPlaceholder}
                                    alt={category}
                                    loading="lazy"
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        opacity: categoryImagesState[category]?.showNext ? 1 : 0,
                                        transition: "opacity 0.5s ease-in-out",
                                    }}
                                />
                            </Box>
                            <CardContent sx={{ position: "absolute", bottom: { xs: -15, md: 0 }, left: 0, bgcolor: "rgba(13, 63, 112, 0.7)", width: "100%" }}>
                                <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default CategoriesComp;