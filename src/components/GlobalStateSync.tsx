import { useEffect } from 'react';
import { setIsAuthenticated } from '../features/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

export default function GlobalStateSync() {

    const dispatch = useAppDispatch();

    const cart = useAppSelector(state => state.cart);
    const favorites = useAppSelector(state => state.filters.favorites);

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