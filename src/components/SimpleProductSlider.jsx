import { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShopContext } from "../contexts/ShopContext";
import { Box, Card, CardMedia, CardContent, Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const SimpleProductSlider = ({ products, categories }) => {

    const { allProducts } = useContext(ShopContext);

    const filteredProducts = categories?.length
        ? allProducts.filter(product => categories.includes(product.category))
        : products;


    const productSliderSettings = {
        lazyLoad: "ondemand",
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        beforeChange: () => {
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
          },
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 3,
            },
          },
        ],
      };
      

    if (allProducts.length === 0) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '90vh',
                flexDirection: 'column',
                backgroundColor: '#121212'
            }}>
                <CircularProgress sx={{ color: "#FF5733" }} />
            </Box>
        );
    }

    return (
        <Box className="product-slider" sx={{ width: "90%", my: {xs: 10, sm: 8, md: 4}, px: 2 }}>
            <Slider {...productSliderSettings}>
                {filteredProducts.map((product) => (
                    <Box
                        key={product.id}
                        sx={{
                            padding: "10px",
                        }}
                    >
                        <Link to={`/shop/products/${product.id}`} style={{ textDecoration: 'none' }}>
                            <Card
                                sx={{
                                    width: {
                                        xs: 100,
                                        sm: 160,
                                        md: 200,
                                    },
                                    height: {xs: 215, sm: 260},
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    p: 1,
                                    borderRadius: "6px",
                                    boxShadow: "2px 2px 2px rgba(51, 51, 51, 0.17)",
                                    backgroundColor: "#fff",
                                    transform: "scale(1)"
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
                                        minHeight: {xs: 120, sm: 150},
                                        objectFit: "contain",
                                        borderRadius: "6px 6px 0 0",
                                    }}
                                />
                                <CardContent sx={{ p: {xs: 0, sm: 1}}}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 2,
                                            textOverflow: 'ellipsis',
                                            overflow: "hidden",
                                            height: "3em",
                                            width: {xs: '7em', sm: '9em', md: '10em', lg: '11em'},
                                            fontSize: {xs: '13px', sm: '16px'},
                                            textAlign: 'center',
                                            p: 0
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
                                            fontWeight: '400' }}>
                                        ${product.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default SimpleProductSlider;