import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const SimpleProductSlider = ({ products, categories }) => {
    const { allProducts } = useContext(ShopContext);

    const filteredProducts = categories?.length
        ? allProducts.filter((product) => categories.includes(product.category))
        : products;

    if (allProducts.length === 0) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "90vh",
                    flexDirection: "column",
                    backgroundColor: "#121212",
                }}
            >
                <CircularProgress sx={{ color: "#FF5733" }} />
            </Box>
        );
    }

    return (
        <Box sx={{ width: "90%", my: { xs: 10, sm: 8, md: 4 }, px: 2, minHeight: 280 }}>
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={10}
                slidesPerView={5}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                grabCursor={true}
                simulateTouch={true}
                touchRatio={1.5}
                touchStartPreventDefault={false}
                breakpoints={{
                    0: { slidesPerView: 3 },
                    600: { slidesPerView: 3 },
                    900: { slidesPerView: 4 },
                    1200: { slidesPerView: 5 },
                }}
                className="product-slider"
            >
                {filteredProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                        <Link to={`/shop/products/${product.id}`} style={{ textDecoration: "none" }}>
                            <Card
                                sx={{
                                    width: {
                                        xs: 100,
                                        sm: 160,
                                        md: 200,
                                    },
                                    height: { xs: 215, sm: 260 },
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    p: 1,
                                    borderRadius: "6px",
                                    boxShadow: "2px 2px 2px rgba(51, 51, 51, 0.17)",
                                    backgroundColor: "#fff",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    sx={{
                                        width: "100%",
                                        height: 150,
                                        minHeight: { xs: 120, sm: 150 },
                                        objectFit: "contain",
                                        borderRadius: "6px 6px 0 0",
                                    }}
                                />
                                <CardContent sx={{ p: { xs: 0, sm: 1 } }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 2,
                                            textOverflow: "ellipsis",
                                            overflow: "hidden",
                                            height: "3em",
                                            width: { xs: "7em", sm: "9em", md: "10em", lg: "11em" },
                                            fontSize: { xs: "13px", sm: "16px" },
                                            textAlign: "center",
                                        }}
                                    >
                                        {product.title}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "black",
                                            textAlign: "center",
                                            mt: 1,
                                            fontWeight: "400",
                                        }}
                                    >
                                        ${product.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default SimpleProductSlider;
