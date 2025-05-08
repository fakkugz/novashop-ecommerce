import { useContext, useEffect, useState, lazy, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const SimpleProductSlider = lazy(() => import("../components/SimpleProductSlider"));
const CategoriesComp = lazy(() => import("../components/CategoriesComp"));
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";

import img1 from '../assets/images/1.webp';
import img2 from '../assets/images/2.webp';
import img3 from '../assets/images/3.webp';
import img4 from '../assets/images/4.webp';

const Home = () => {
    const { allProducts } = useContext(ShopContext);
    const [showSlider, setShowSlider] = useState(false);

    const slides = [
        { img: img1, path: "/shop?category=electronics" },
        { img: img2, path: "/shop?category=women's clothing" },
        { img: img3, path: "/shop?category=jewelery" },
        { img: img4, path: "/shop?category=men's clothing" },
    ];

    useEffect(() => {
        const timer = setTimeout(() => setShowSlider(true), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Box className="home-container" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box className="slider-container" sx={{ width: { xs: "112%", sm: '100%' }, mb: { xs: -2, sm: -3, md: -4, lg: -6 } }}>
                {!showSlider ? (
                    <Link to={slides[0].path}>
                        <Box sx={{ width: '100%', aspectRatio: '970 / 250', overflow: 'hidden' }}>
                            <img
                                src={slides[0].img}
                                alt="Slide 1"
                                fetchpriority="high"
                                loading="eager"
                                width="970"
                                height="250"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    display: 'block',
                                }}
                            />
                        </Box>
                    </Link>
                ) : (
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={0}
                        slidesPerView={1}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        navigation
                        loop
                        grabCursor
                        className="home-slider"
                    >
                        {slides.map(({ img, path }, index) => (
                            <SwiperSlide key={index}>
                                <Link to={path}>
                                    <Box sx={{ width: '100%', aspectRatio: '970 / 250', overflow: 'hidden' }}>
                                        <img
                                            src={img}
                                            alt={`Slide ${index + 1}`}
                                            width="970"
                                            height="250"
                                            loading={index === 0 ? "eager" : "lazy"}
                                            fetchpriority={index === 0 ? "high" : "low"}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                                display: 'block',
                                            }}
                                        />
                                    </Box>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </Box>

            <Suspense fallback={null}>
                <SimpleProductSlider products={allProducts} />
            </Suspense>

            <Suspense fallback={null}>
                <CategoriesComp />
            </Suspense>

            <Typography
                variant="h5"
                sx={{
                    color: "white",
                    alignSelf: { xs: 'center', sm: 'flex-start' },
                    fontFamily: 'Montserrat, sans-serif',
                    pl: { xs: 0, sm: 10 },
                    mt: 10,
                    mb: 2
                }}
            >
                RECOMMENDED FOR YOU
            </Typography>

            <Suspense fallback={null}>
                <SimpleProductSlider categories={["electronics", "men's clothing"]} />
            </Suspense>
        </Box>
    );
};

export default Home;
