import { useState, useContext, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import { ShopContext } from "./contexts/ShopContext";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import History from "./pages/History";
import Checkout from './pages/Checkout';
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import { ThemeProvider, CssBaseline } from '@mui/material';
import Theme from './contexts/Theme';
import ScrollToTopAndWait from "./components/ScrollToTopAndWait";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppContent loading={loading} setLoading={setLoading} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

const AppContent = ({ loading, setLoading }) => {
  const location = useLocation();
  const { setAllProducts, setCategories, setFilteredProducts, allProducts } = useContext(ShopContext);

  // Resetear los filtros cuando cambia la página
  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [location.pathname, allProducts]);

  // Cargar productos
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

  // Cargar categorías
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
          <Footer />
        </div>
      </ScrollToTopAndWait>
    </>
  );
};

export default App;
