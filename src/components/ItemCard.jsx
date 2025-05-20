import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import Favorite from '@mui/icons-material/Favorite';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { formatPrice } from '../utils/formatPrice';
import { setFavorites } from '../features/filtersSlice';
import { setCart, addToCart } from '../features/cartSlice';


const ExpandMoreStyled = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function ItemCard({ id, title, price, description,
  category, image, rate, onAddToCartSuccess, sx = {} }) {

  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const favorites = useSelector(state => state.filters.favorites)
  const cart = useSelector(state => state.cart.cart)

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isFavorite = favorites.some(fav => fav.id === id);
  const isInCart = cart.some(prod => prod.id === id);

  const toggleFavorite = () => {
    if (isAuthenticated) {
      isFavorite
        ? dispatch(setFavorites(favorites.filter(fav => fav.id !== id)))
        : dispatch(setFavorites([...favorites, {
          id,
          title,
          price,
          description,
          category,
          image,
          rating: { rate }
        }]));
    } else {
      setOpenDialog(true);
    }
  };

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(setCart(cart.filter(prod => prod.id !== id)));
    } else {
      const newProduct = {
        id,
        title,
        price,
        description,
        category,
        image,
        rate,
      };
      dispatch(addToCart(newProduct));
      if (onAddToCartSuccess) {
        onAddToCartSuccess(newProduct);
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Card
      id={id}
      sx={{
        maxWidth: 284,
        minHeight: { xs: 400, sm: 480, md: 520 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...sx,
      }}
    >
      <Link to={`/shop/products/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box
          sx={{
            height: { xs: 190, sm: 220, md: 260 },
            width: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1,
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>

        <CardHeader
          title={title}
          subheader={`${category} - ${rate}`}
          sx={{
            '& .MuiCardHeader-title': {
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              maxWidth: '100%',
              fontSize: { xs: '16px', sm: '20px' }
            },
            '& .MuiCardHeader-subheader': {
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              maxWidth: '100%',
              fontSize: { xs: '11px', sm: '16px' }
            },
          }}
        />

        <Box sx={{ m: { xs: 0, sm: 1 } }}>
          <CardContent>
            <Typography variant="h4" align="center" sx={{ fontSize: { xs: '25px', sm: '30px' } }}>
              {`$ ${formatPrice(price)}`}
            </Typography>
          </CardContent>
        </Box>
      </Link>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={toggleFavorite} sx={{ '&:focus': { outline: 'none' } }}>
          <Tooltip title="Add to Favorites" arrow>
            <Favorite sx={{ color: isFavorite ? 'secondary.main' : 'inherit' }} />
          </Tooltip>
        </IconButton>
        <IconButton aria-label="share" onClick={handleAddToCart} sx={{ '&:focus': { outline: 'none' } }}>
          <Tooltip title="Add to Cart" arrow>
            <ShoppingCart sx={{ color: isInCart ? 'primary.main' : 'inherit' }} />
          </Tooltip>
        </IconButton>
        <ExpandMoreStyled
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{
            '&:focus': {
              outline: 'none',
            }
          }}
        >
          <Tooltip title="+ Info" arrow>
            <ExpandMoreIcon />
          </Tooltip>
        </ExpandMoreStyled>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" sx={{ color: 'black' }}>
            {description}
          </Typography>
        </CardContent>
      </Collapse>

      <Dialog open={openDialog}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <Typography variant="body1">You must log in to add products to favorites.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
