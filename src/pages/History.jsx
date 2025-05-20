import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ItemCard from "../components/ItemCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";

const History = () => {
    const { lastPurchased, lastVisited } = useSelector(state => state.history);
    const favorites = useSelector(state => state.filters.favorites)

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            {[
                { title: "Last Purchases", products: lastPurchased },
                { title: "Recently Viewed", products: lastVisited },
                { title: "Favorites", products: favorites },
            ].map(({ title, products }, index) => {

                const validProducts = products || [];

                const swiperSettings = {
                    modules: [Navigation, Autoplay],
                    spaceBetween: 10,
                    slidesPerView: 4,
                    navigation: true,
                    loop: true,
                    autoplay: { delay: 3000, disableOnInteraction: false },
                    grabCursor: true,
                    simulateTouch: true,
                    touchRatio: 1.5,
                    touchStartPreventDefault: false,
                    breakpoints: {
                        0: { slidesPerView: 2 },
                        600: { slidesPerView: 3 },
                        900: { slidesPerView: 4 },
                        1200: { slidesPerView: 4 },
                    }
                };

                return (
                    <Paper
                        key={index}
                        elevation={3}
                        sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            padding: 2,
                            mt: index === 0 ? 0 : 3,
                            maxWidth: "1200px",
                            height: {
                                xs: validProducts.length > 0 ? '420px' : '120px',
                                sm: validProducts.length > 0 ? '480px' : '130px',
                                md: validProducts.length > 0 ? '540px' : '130px',
                              },
                            mx: "auto",
                            transition: "height 0.5s ease-in-out",
                            overflow: "hidden",
                        }}
                    >
                        <Typography variant="h6" sx={{ color: "white", mb: -4 }}>
                            {title}
                        </Typography>

                        {validProducts.length > 0 ? (
                            <Box sx={{ px: 2 }}>
                                <Swiper {...swiperSettings}>
                                    {validProducts.map((product) => (
                                        <SwiperSlide key={product.id}>
                                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                <Box sx={{ transform: { xs: "scale(0.8)", md: "scale(0.85)" } }}>
                                                    <ItemCard
                                                        {...product}
                                                        rate={product.rating?.rate}
                                                        sx={{
                                                            boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.2)',
                                                            width: { xs: '170px', sm: '220px' }
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>
                        ) : (
                            <Typography variant="body2" sx={{ color: "white", mt: 7 }}>
                                No products available
                            </Typography>
                        )}
                    </Paper>
                );
            })}
        </Container>
    );
};

export default History;
