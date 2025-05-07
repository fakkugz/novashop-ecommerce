import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Favorite from '@mui/icons-material/Favorite';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';
import AddedToCart from '../components/AddedToCart';
import { AuthContext } from '../contexts/AuthContext';


const ProductDetails = () => {

    const { id } = useParams();
    const { allProducts, addToCart, addToCartOpenModal, setAddToCartOpenModal,
            lastAddedProduct, setLastAddedProduct, updateLastVisited,
            favorites, setFavorites } = useContext(ShopContext);

    const { isAuthenticated } = useContext(AuthContext);

    const product = allProducts.find(product => product.id === Number(id));

    const [openDialog, setOpenDialog] = useState(false);

    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (product) {
            updateLastVisited(product);
        }
      }, []);

      const handleAddToCart = (product) => {
        addToCart(product);
        setLastAddedProduct(product)
        setAddToCartOpenModal(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
      };

    const isFavorite = favorites.some(fav => fav.id === product.id);

    const toggleFavorite = () => {
        if (isAuthenticated) {
            if (isFavorite) {
                setFavorites(favorites.filter(fav => fav.id !== Number(id)));
            } else {
                setFavorites([...favorites, product]);
            }
        } else {
            setOpenDialog(true);
        }
    };

    if (!product) {
        return (
          <section className="task-details">
            <p>No se encontró el producto con ID: {id}</p>
            <Link to="/shop">
              <button className="btn-back">VOLVER</button>
            </Link>
          </section>
        );
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            p: { xs: 2, md: 1 },
            }}>
            <Button
                sx={{ alignSelf: 'center', ml: 4, color: 'white' }}
                onClick={() => navigate(-1)}
            >
                <ArrowBack />
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                    BACK
                </Typography>
            </Button>
            <Grid container spacing={3} sx={{
                                        width: '100%',
                                        maxWidth: '1200px',
                                        background: 'rgb(27, 27, 27)',
                                        border: '1px solid rgba(255, 255, 255, 0.67)',
                                        borderRadius: '10px',
                                        boxShadow: '1px 1px 3px rgba(255, 255, 255, 0.47)',
                                        p: { xs: 2, md: 5 },
                                        }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    {/* Imagen */}
                    <Box sx={{
                            background: 'white',
                            height: { xs: '400px', md: '510px' },
                            borderRadius: '5px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                            p: 1,
                            }}>
                        <IconButton
                            onClick={toggleFavorite}
                            sx={{
                                position: 'absolute',
                                top: 5,
                                left: 5,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
                            }}
                        >
                            <Favorite
                                sx={{
                                    color: isFavorite ? 'secondary.main' : 'white',
                                    opacity: 0.7,
                                    '&:hover' : {
                                        opacity: 1
                                    }
                                    }} />
                        </IconButton>
                        <CardMedia
                            component="img"
                            alt={product.title}
                            image={product.image}
                            sx={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '5px' }}
                        />
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    {/* Detalles */}
                    <Card sx={{
                            height: { xs: 'auto', md: '524px' },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            background: '#1b1b1b',
                            border: '1px solid rgba(255,255,255,0.15)',
                            boxShadow: 'inset 0 0 6px rgba(255,255,255,0.05)',
                            color: 'white',
                            }}>
                        <CardContent sx={{ p: { xs: 2, md: 3 }, flexGrow: 1 }}>
                            <Typography variant="h4" gutterBottom>
                                {product.title}
                            </Typography>
                            <Divider sx={{ mb: 2, bgcolor: 'grey.500' }}/>
                            <Typography variant="h3" component="p" sx={{ mb: 2 }}>
                                $ {product.price}
                            </Typography>
                            <Box
                                sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 2,
                                justifyContent: 'space-between',
                                mb: 3,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth={true}
                                    onClick={() => {
                                        addToCart(product);
                                        navigate('/cart');
                                    }}
                                    sx={{
                                        backgroundColor: 'secondary.light',
                                        color: 'white',
                                        border: '2px solid transparent',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            backgroundColor: 'secondary.main',
                                            border: '2px solid rgb(248, 115, 6)',
                                        },
                                    }}
                                >
                                    Buy Now
                                </Button>

                                <Button
                                    variant="outlined"
                                    size="large"
                                    fullWidth={true}
                                    onClick={() => handleAddToCart(product)}
                                    sx={{
                                        color: 'secondary.main',
                                        border: `2px solid ${theme.palette.secondary.main}`,
                                        '&:hover': {
                                        backgroundColor: 'rgba(25, 118, 210, 0.4)',
                                        borderColor: '#4fc3f7',
                                        color: '#FF5121'
                                        },
                                    }}
                                >
                                    Add to cart
                                </Button>
                            </Box>
                            <Divider sx={{ mb: 2 }}/>
                            <Typography variant="body1" color="rgb(233, 233, 233)">
                                {product.description}
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Button
                sx={{ alignSelf: 'center', ml: 4, color: 'white' }}
                onClick={() => navigate(-1)}
            >
                <ArrowBack />
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                    BACK
                </Typography>
            </Button>
            <AddedToCart
                open={addToCartOpenModal}
                product={lastAddedProduct}
                onClose={() => setAddToCartOpenModal(false)}
            />
            <Dialog open={openDialog}>
                <DialogTitle>Login Required</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">You must log in to add products to favorites.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductDetails;
