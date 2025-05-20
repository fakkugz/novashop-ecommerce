import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAuthenticated } from '../features/authSlice';

export default function GlobalStateSync() {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart.cart);
    const favorites = useSelector(state => state.filters.favorites);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        const storedAuth = localStorage.getItem("isAuthenticated");
        if (storedAuth === "true") {
            dispatch(setIsAuthenticated(true));
        }
    }, []);

    return null;
}