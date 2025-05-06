import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({children}) => {

    const [allProducts, setAllProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [activeFilters, setActiveFilters] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
    const [rateFilter, setRateFilter] = useState({ min: 1, max: 5 });
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [rateRange, setRateRange] = useState([1, 5]);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [addToCartOpenModal, setAddToCartOpenModal] = useState(false);
    const [lastAddedProduct, setLastAddedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
      });

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem("favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    const [lastPurchased, setLastPurchased] = useState(() => {
        const savedLastPurchased = localStorage.getItem("lastPurchased");
        return savedLastPurchased ? JSON.parse(savedLastPurchased) : [];
    });
      
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);

      useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

        
    const addToCart = (product) => {
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);
        if (existingProductIndex >= 0) {
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].quantity += 1;
        setCart(updatedCart);
        } else {
        setCart([...cart, { ...product, quantity: 1 }]);  
        }
    };

    
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    };

    
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
        removeFromCart(productId); 
        } else {
        const updatedCart = cart.map(item => 
            item.id === productId ? { ...item, quantity } : item
        );
        setCart(updatedCart);
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const handleAddedToCart = (product) => {
        addToCart(product); 
        setLastAddedProduct(product);
        setAddToCartOpenModal(true);
    };

    const [lastVisited, setLastVisited] = useState(() => {
        return JSON.parse(localStorage.getItem("lastVisited")) || [];
      });

    
    useEffect(() => {
        const storedVisited = JSON.parse(localStorage.getItem("lastVisited")) || [];
        setLastVisited(storedVisited);
    }, []);

    const updateLastVisited = (product) => {
        setLastVisited((prev) => {
            const updatedList = prev.filter(item => item.id !== product.id);
            const newList = [product, ...updatedList].slice(0, Math.min(10, updatedList.length + 1));
            localStorage.setItem("lastVisited", JSON.stringify(newList));
            return newList;
        });
    };

    const formatPrice = (price) => {
        const num = Number(price);
        if (isNaN(num)) return '$ 0';
        return num % 1 === 0 ? num : num.toFixed(2);
      };

      const handleCloseModal = () => {
        setAddToCartOpenModal(false);
    };

    const updateLastPurchased = () => {
        setLastPurchased((prev) => {
            if (cart.length === 0) return prev;
            const filteredPrev = prev.filter(item => !cart.some(p => p.id === item.id));
            const updatedList = [...cart, ...filteredPrev].slice(0, 10);
    
            localStorage.setItem("lastPurchased", JSON.stringify(updatedList)); 
            return updatedList;
        });
        setCart([]);
    };
    

    return (
        <ShopContext.Provider value={{allProducts, setAllProducts,
                                      categories, setCategories,
                                      activeFilters, setActiveFilters,
                                      filteredProducts, setFilteredProducts,
                                      min, setMin, max, setMax,
                                      rateRange, setRateRange,
                                      priceFilter, setPriceFilter,
                                      rateFilter, setRateFilter,
                                      favorites, setFavorites,
                                      showOnlyFavorites, setShowOnlyFavorites,
                                      cart, addToCart, removeFromCart,
                                      updateQuantity, clearCart,
                                      handleAddedToCart, formatPrice,
                                      addToCartOpenModal, setAddToCartOpenModal,
                                      lastAddedProduct, setLastAddedProduct,
                                      handleCloseModal, productsPerPage,
                                      currentPage, setCurrentPage, currentProducts,
                                      lastVisited, updateLastVisited,
                                      lastPurchased, updateLastPurchased}}>
            {children}
        </ShopContext.Provider>
    );
};