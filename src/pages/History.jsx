import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Container, Typography, Paper, Box } from "@mui/material";
import ItemCard from "../components/ItemCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const History = () => {
    const { lastPurchased, favorites, lastVisited } = useContext(ShopContext);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            {[
                { title: "Last Purchases", products: lastPurchased },
                { title: "Recently Viewed", products: lastVisited },
                { title: "Favorites", products: favorites },
            ].map(({ title, products }, index) => {

                const validProducts = products || [];

                const settings = {
                    dots: true,
                    infinite: false,
                    speed: 500,
                    slidesToShow: Math.min(validProducts.length, 4),
                    slidesToScroll: 3,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: Math.min(validProducts.length, 3),
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: Math.min(validProducts.length, 2),
                                slidesToScroll: 1,
                            },
                        },
                    ],
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
                                xs: validProducts.length > 0 ? '425px' : '120px',
                                sm: validProducts.length > 0 ? '540px' : '130px',
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
                            <Box className='history-slider' sx={{ px: 2 }}>
                                <Slider {...settings}>
                                    {validProducts.map((product) => (
                                        <Box
                                            key={product.id}
                                            sx={{ display: "flex", justifyContent: "center" }}
                                        >
                                            <Box
                                                sx={{
                                                    transform: { xs: "scale(0.8)", md: "scale(0.85)" }
                                                }}>
                                                <ItemCard
                                                    {...product}
                                                    rate={product.rating?.rate}
                                                    sx={{ boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.2)',
                                                          width: {xs: '170px', sm: '220px'}
                                                    }} />
                                            </Box>
                                        </Box>
                                    ))}
                                </Slider>
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
