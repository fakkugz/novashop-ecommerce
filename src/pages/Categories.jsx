import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ItemCard from "../components/ItemCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

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

        // Swiper settings
        const swiperSettings = {
          modules: [Navigation, Autoplay],
          spaceBetween: 10,
          slidesPerView: Math.min(categoryProducts.length, 4),
          autoplay: { delay: 2800, disableOnInteraction: false },
          navigation: true,
          grabCursor: true,
          loop: true,
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
              mx: "auto",
              height: {
                xs: categoryProducts.length > 0 ? '420px' : '120px',
                sm: categoryProducts.length > 0 ? '480px' : '130px',
                md: categoryProducts.length > 0 ? '540px' : '130px',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, mb: -4 }}>
              <Typography variant="h6" sx={{ color: "white", fontFamily: 'Montserrat, sans-serif' }}>
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
                <Swiper {...swiperSettings}>
                  {categoryProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <Box sx={{ transform: { xs: "scale(0.75)", md: "scale(0.8)" } }}>
                        <ItemCard
                          {...product}
                          rate={product.rating?.rate}
                          sx={{ width: { xs: '180px', sm: '220px' } }}
                        />
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

export default Categories;
