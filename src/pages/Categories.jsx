import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { Container, Typography, Paper, Box } from "@mui/material";
import ItemCard from "../components/ItemCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Categories = () => {
  const { categories, allProducts } = useContext(ShopContext);

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("category", category);
    navigate(`/shop?${searchParams.toString()}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {categories.map((category, index) => {
        const categoryProducts = allProducts.filter(
          (product) => product.category === category
        );

        const settings = {
            dots: true,
            infinite: true,   
            speed: 500,      
            slidesToShow: Math.min(categoryProducts.length, 4),
            slidesToScroll: 1,
            autoplay: true, 
            autoplaySpeed: 2800,
            cssEase: 'linear',
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: Math.min(categoryProducts.length, 3),
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: Math.min(categoryProducts.length, 2),
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
              mx: "auto",
              height: {
                xs: categoryProducts.length > 0 ? '425px' : '120px',
                sm: categoryProducts.length > 0 ? '540px' : '130px',
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, mb: -4 }}>
                <Typography variant="h6" sx={{ color: "white", fontFamily: 'Montserrat, sans-serif', }}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </Typography>
                <Typography
                    sx={{
                    color: "white",
                    textDecoration: "underline",
                    cursor: "pointer",
                    zIndex: 2,
                    }}
                    onClick={() => handleCategoryClick(category)}
                >
                    View All
                </Typography>
            </Box>

            {categoryProducts.length > 0 ? (
              <Box sx={{ px: 2 }}>
                <Slider {...settings}>
                  {categoryProducts.map((product) => (
                    <Box
                      key={product.id}
                      sx={{ transform: {xs: "scale(0.75)", md: "scale(0.8)"} }}
                    >
                        <ItemCard
                          {...product}
                          rate={product.rating?.rate}
                          sx={{ width: {xs: '180px', sm: '220px'} }}/>
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

export default Categories;
