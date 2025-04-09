import { Box, Card, CardContent, Typography, Button, Divider, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { AuthContext } from '../contexts/AuthContext';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, formatPrice, handleCloseModal, clearCart } = useContext(ShopContext);
    const { isAuthenticated } = useContext(AuthContext);
    const [open, setOpen] = useState(false); // Estado para controlar el modal de confirmación

    useEffect(() => {
        // Cierra el modal al desmontar el componente
        return () => {
            handleCloseModal();
        };
    }, []);

    const shippingPrice = 500;

    const navigate = useNavigate();

    const calculateSubtotal = () => formatPrice(cart.reduce((total, item) => total + item.price * item.quantity, 0));

    const calculateTotal = () => formatPrice(calculateSubtotal() + shippingPrice);

    const handleOpenModal = () => {
        setOpen(true); // Abre el modal
    };

    const handleCloseModalConfirmation = () => {
        setOpen(false); // Cierra el modal sin hacer nada
    };

    const handleConfirmCleanCart = () => {
        clearCart(); // Llama a la función cleanCart
        setOpen(false); // Cierra el modal después de limpiar el carrito
    };

    const isDisabled = cart.length === 0;

    const handleBuyNow = () => {
        if (isDisabled) return;
        navigate(isAuthenticated ? '/checkout' : '/login');
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            gap: 2,
            p: { xs: 2, md: 5 },
            height: 'auto',
        }}>
            <Grid container spacing={3} sx={{
                width: '100%',
                maxWidth: '1200px',
                background: 'rgb(27, 27, 27)',
                border: '1px solid rgba(255, 255, 255, 0.67)',
                borderRadius: '10px',
                boxShadow: '1px 1px 3px rgba(255, 255, 255, 0.47)',
                p: { xs: 2, md: 3 },
            }}>
                {/* Sección izquierda: Lista de productos en el carrito */}
                {cart.length === 0 ? (
                    <Grid size={{ xs: 12, md: 8 }} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        color: 'white',
                    }}>
                        <Typography variant="h5">No products added to the cart</Typography>
                    </Grid>
                ) : (
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Box sx={{
                            p: 2,
                            borderRadius: '5px',
                            height: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            border: '1px solid rgba(255,255,255,0.15)',
                            boxShadow: 'inset 0 0 6px rgba(255,255,255,0.05)',
                        }}>
                            <Typography variant="h5" gutterBottom>
                                Products in Cart
                            </Typography>
                            <Divider sx={{ mb: 2, bgcolor: 'grey.500' }} />
                            {cart.map((product, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        alignItems: { xs: 'flex-start', sm: 'center' },
                                        justifyContent: { xs: 'flex-start', sm: 'space-between' },
                                        gap: { xs: 1, sm: 2 }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <IconButton
                                            onClick={() => removeFromCart(product.id)}
                                            sx={{
                                                color: 'white',
                                                p: 0.5,
                                                mr: 1,
                                                '&:focus': {
                                                    outline: 'none',
                                                    boxShadow: 'none'
                                                },
                                                '&:active': {
                                                    outline: theme => `1px solid ${theme.palette.primary.main}`
                                                }
                                            }}
                                        >
                                            <DeleteForeverIcon />
                                        </IconButton>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{
                                                bgcolor: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                p: 0.4,
                                                borderRadius: '25%',
                                                boxShadow: '1px 1px 3px rgba(255,255,255,0.43)',
                                            }}>
                                                <img src={product.image} alt={product.title} style={{
                                                    width: 50, height: 50, objectFit: 'contain'
                                                }} />
                                            </Box>
                                            <Typography variant="body2" sx={{
                                                maxWidth: 360,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'normal',
                                                display: '-webkit-box',
                                                WebkitLineClamp: { xs: 2, md: 1 },
                                                WebkitBoxOrient: 'vertical',
                                            }}>
                                                {product.title}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            minWidth: '215px',
                                            display: 'flex',
                                            gap: 5,
                                            alignItems: 'center',
                                            alignSelf: { xs: 'center', md: 'center' },
                                            justifyContent: 'space-between',
                                            mb: { xs: 3, sm: 0 }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                                sx={{ p: 0, minWidth: 'auto' }}
                                            >
                                                <RemoveIcon />
                                            </Button>
                                            <Typography variant="body2" sx={{ minWidth: '16px', p: 1, textAlign: 'center' }}>
                                                {product.quantity}
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                                sx={{ p: 0, minWidth: 'auto' }}
                                            >
                                                <AddIcon />
                                            </Button>
                                        </Box>
                                        <Typography variant="body2" sx={{ fontSize: '18px' }}>
                                            $ {formatPrice(product.price * product.quantity)}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                            <Divider sx={{ mt: 2, bgcolor: 'grey.500' }} />
                            <Typography variant="h6" sx={{ textAlign: 'right', mt: 2 }}>
                                Subtotal: ${calculateSubtotal()}
                            </Typography>
                        </Box>
                    </Grid>
                )}
                {/* Sección derecha: Resumen del pedido */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        background: '#1b1b1b',
                        border: '1px solid rgba(255,255,255,0.15)',
                        boxShadow: 'inset 0 0 6px rgba(255,255,255,0.05)',
                        color: 'white',
                        p: 3,
                    }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Order Summary
                            </Typography>
                            <Divider sx={{ mb: 2, bgcolor: 'grey.500' }} />
                            <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Products ({cart.reduce((total, item) => total + item.quantity, 0)})</span>
                                <span>$ {calculateSubtotal()}</span>
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <span>Shipping</span>
                                <span>{cart.length === 0 ? `$ 0` : `$ ${shippingPrice}`}</span>
                            </Typography>
                            <Divider sx={{ my: 2, bgcolor: 'grey.500' }} />
                            {cart.length === 0 ? null : (
                                <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Total</span>
                                    <span>$ {calculateTotal()}</span>
                                </Typography>
                            )}
                        </CardContent>
                        <Button
                            variant="contained"
                            disabled={isDisabled}
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleBuyNow}
                        >
                            Buy Now
                        </Button>
                        
                        {/* Botón para limpiar el carrito */}
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleOpenModal} // Abre el modal de confirmación
                        >
                            Clear Cart
                        </Button>
                    </Card>
                </Grid>
            </Grid>

            {/* Botón de volver a la página principal */}
            <Link to="/">
                <Button onClick={() => { handleCloseModal(); navigate(-1); }} sx={{ alignSelf: 'flex-start', ml: 4, color: 'white' }}>
                    <ArrowBackIcon />
                    <Typography variant="body1" sx={{ marginLeft: 1 }}>
                        BACK
                    </Typography>
                </Button>
            </Link>

            {/* Modal de confirmación */}
            <Dialog open={open} onClose={handleCloseModalConfirmation}>
                <DialogTitle>Confirm Clear Cart</DialogTitle>
                <DialogContent>
                    <Typography variant="body2">Are you sure you want to clear all items in your cart?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModalConfirmation} sx={{ color: "secondary.main" }}>Cancel</Button>
                    <Button onClick={handleConfirmCleanCart} color="primary">Clear Cart</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
