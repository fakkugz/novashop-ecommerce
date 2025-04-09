import { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";
import CategoriesComp from "../components/CategoriesComp";
import SimpleProductSlider from "../components/SimpleProductSlider";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";
import img1 from '../assets/images/1.png';
import img2 from '../assets/images/2.png';
import img3 from '../assets/images/3.png';
import img4 from '../assets/images/4.png';

const Home = () => {

    const { allProducts } = useContext(ShopContext)

    const mainSliderSettings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
    };

    const slides = [
        { img: img1, path: "/shop?category=electronics" },
        { img: img2, path: "/shop?category=women's clothing" },
        { img: img3, path: "/shop?category=jewelery" },
        { img: img4, path: "/shop?category=men's clothing" },
    ];


    return (
        <Box className="home-container" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box className="slider-container" sx={{ width: {xs: "112%", sm: '100%' }, mb: -12 }}>
                <Slider {...mainSliderSettings}>
                    {slides.map(({ img, path }, index) => (
                        <Box key={index} className="slide">
                            <Link to={path}>
                                <img src={img} alt={`Slide ${index + 1}`} style={{ width: "100%", cursor: "pointer" }} />
                            </Link>
                        </Box>
                    ))}
                </Slider>
            </Box>
            <SimpleProductSlider products={allProducts} />
            <CategoriesComp />
            <Typography
                variant="h5"
                sx={{
                    color: "white",
                    alignSelf: {xs: 'center', sm: 'flex-start'},
                    fontFamily: 'Montserrat, sans-serif',
                    pl: {xs: 0, sm: 10},
                    mt: 10,
                    mb: { xs: -8, md: -2 }
                }}
            >
                RECOMMENDED FOR YOU
            </Typography>
            <SimpleProductSlider categories={["electronics", "men's clothing"]} />
        </Box>
    );
};

export default Home;
