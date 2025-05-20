import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Theme from './contexts/Theme';
import ScrollToTopAndWait from "./components/ScrollToTopAndWait";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Provider } from 'react-redux';
import { store } from './store';
import { useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories } from './features/productsSlice';
import GlobalStateSync from "./components/GlobalStateSync";


const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const Footer = lazy(() => import("./components/Footer"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Login = lazy(() => import("./pages/Login"));
const History = lazy(() => import("./pages/History"));
const Checkout = lazy(() => import('./pages/Checkout'));
const Categories = lazy(() => import("./pages/Categories"));


const DataLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return null;
};

const App = () => (
  <Provider store={store}>
    <GlobalStateSync />
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <BrowserRouter basename="/novashop-ecommerce">
        <DataLoader />
        <NavBar />
        <ScrollToTopAndWait>
          <div className="main-scroll-container">
            <Suspense fallback={<CircularProgress sx={{ m: 4 }} />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/shop/products/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/history" element={<History />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </ScrollToTopAndWait>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
