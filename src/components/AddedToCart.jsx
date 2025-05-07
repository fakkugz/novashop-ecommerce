import { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';


const AddedToCart = () => {  

    const { addToCartOpenModal, lastAddedProduct, handleCloseModal} = useContext(ShopContext);


    return (
        <Dialog open={addToCartOpenModal} onClose={handleCloseModal}>
            <DialogTitle>Product Added to Cart</DialogTitle>
            <DialogContent>
                <Typography>
                    <CheckCircleIcon sx={{ color: '#FF4511', mr: 1, mb: '-6px' }} />
                    <strong>{lastAddedProduct?.title}</strong> has been added to your cart.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal} sx={{ color: "#FF4511" }}>
                    Continue Shopping
                </Button>
                <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <Button color="primary" variant="contained">
                        View Cart
                    </Button>
                </Link>
            </DialogActions>
        </Dialog>
    );
};

export default AddedToCart;

