import { useState, useContext, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { ShopContext } from "./contexts/ShopContext";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, CircularProgress } from '@mui/material';
import Theme from './contexts/Theme';
import ScrollToTopAndWait from "./components/ScrollToTopAndWait";


import NavBar from "./components/NavBar";
import Home from "./pages/Home";


const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const Footer = lazy(() => import("./components/Footer"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Login = lazy(() => import("./pages/Login"));
const History = lazy(() => import("./pages/History"));
const Checkout = lazy(() => import('./pages/Checkout'));
const Categories = lazy(() => import("./pages/Categories"));

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <BrowserRouter basename="/novashop-ecommerce">
        <AppContent loading={loading} setLoading={setLoading} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

const AppContent = ({ loading, setLoading }) => {
  const location = useLocation();
  const { setAllProducts, setCategories, setFilteredProducts, allProducts } = useContext(ShopContext);

  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [location.pathname, allProducts]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setAllProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <ScrollToTopAndWait>
        <div className="main-scroll-container">
          <Suspense fallback={<CircularProgress sx={{ m: 4 }} />}>
            <Routes key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/shop' element={<Shop loading={loading} />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/shop/products/:id' element={<ProductDetails />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/history' element={<History />} />
              <Route path='/checkout' element={<Checkout />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </ScrollToTopAndWait>
    </>
  );
};

export default App;
