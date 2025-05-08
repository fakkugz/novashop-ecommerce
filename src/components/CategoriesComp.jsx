import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useState, useEffect, useRef } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import imgPlaceholder from '../assets/images/27002.webp';

const FadeImage = ({ src }) => {
    const [prevSrc, setPrevSrc] = useState(src);
    const [showNew, setShowNew] = useState(false);

    useEffect(() => {
        if (src !== prevSrc) {
            setShowNew(true);
            const timeout = setTimeout(() => {
                setPrevSrc(src);
                setShowNew(false);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [src, prevSrc]);

    return (
        <Box sx={{ position: 'relative', width: '100%', height: { xs: 190, sm: 300, md: 390 } }}>
            <motion.img
                key={prevSrc}
                src={prevSrc}
                initial={{ opacity: 1 }}
                animate={{ opacity: showNew ? 0 : 1 }}
                transition={{ duration: 1 }}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                }}
            />
            {showNew && (
                <motion.img
                    key={src}
                    src={src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                />
            )}
        </Box>
    );
};


const CategoriesComp = () => {
    const { allProducts, categories } = useContext(ShopContext);
    const navigate = useNavigate();
    const [currentImages, setCurrentImages] = useState({});
    const categoryImages = useRef({});
    const imageIndexes = useRef({});

    useEffect(() => {
        if (allProducts.length === 0 || categories.length === 0) return;

        const initialImages = {};
        const imageMap = {};
        const indexMap = {};

        categories.forEach((category) => {
            const images = allProducts
                .filter((p) => p.category === category)
                .map((p) => p.image);
            if (images.length > 0) {
                imageMap[category] = images;
                indexMap[category] = 0;
                initialImages[category] = images[0];
            }
        });

        categoryImages.current = imageMap;
        imageIndexes.current = indexMap;
        setCurrentImages(initialImages);
    }, [allProducts, categories]);

    useEffect(() => {
        if (categories.length === 0 || allProducts.length === 0) return;

        const interval = setInterval(() => {
            const newImages = {};

            categories.forEach((category) => {
                const images = categoryImages.current[category];
                if (!images || images.length <= 1) return;

                let currentIndex = imageIndexes.current[category];
                const nextIndex = (currentIndex + 1) % images.length;
                imageIndexes.current[category] = nextIndex;
                newImages[category] = images[nextIndex];
            });

            setCurrentImages((prev) => ({ ...prev, ...newImages }));
        }, 5000);

        return () => clearInterval(interval);
    }, [categories, allProducts]);

    const handleCategoryClick = (category) => {
        navigate(`/shop?category=${encodeURIComponent(category)}`);
    };

    if (allProducts.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    width: '100%',
                    flexDirection: 'column',
                    backgroundColor: 'transparent',
                }}
            >
                <CircularProgress sx={{ color: "#FF5733" }} />
            </Box>
        );
    }

    return (
        <Box className='divloco' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: { xs: 0, md: 4 } }}>
            <Typography
                variant="h4"
                sx={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: { xs: '25px', sm: '35px' },
                }}
            >
                CATEGORIES
            </Typography>
            <Grid container spacing={2} rowSpacing={{ xs: 2, md: 8 }} sx={{ mt: 4, width: '70%', display: 'flex' }}>
                {categories.map((category) => (
                    <Grid key={category} size={{ xs: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
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
                                transition: 'transform 0.3s ease',
                            }}
                        >
                            <FadeImage src={currentImages[category] || imgPlaceholder} />

                            <CardContent
                                sx={{
                                    position: "absolute",
                                    bottom: { xs: -15, md: 0 },
                                    left: 0,
                                    bgcolor: "rgba(13, 63, 112, 0.7)",
                                    width: "100%",
                                }}
                            >
                                <Typography variant="h6" sx={{ color: "white", textAlign: "center", fontSize: { xs: '16px', sm: '18px', md: '21px' } }}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CategoriesComp;
