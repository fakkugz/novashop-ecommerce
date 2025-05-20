import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateLastPurchased } from "../features/historySlice";
import { clearCart } from "../features/cartSlice";

const Checkout = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const address = useSelector(state => state.auth.user.address)
  const [shippingAddress, setShippingAddress] = useState(address);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
          window.scrollTo(0, 0);
        }, []);

  const handleAddressChange = (event) => {
    setShippingAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateLastPurchased());
    dispatch(clearCart());
    setOpenModal(true);
  };

  const handleCloseModalAndRedirect = () => {
    setOpenModal(false);
    navigate("/shop"); 
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, mt: 5, bgcolor: 'primary.main' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid size={{ sm: 6 }}>
                <Typography variant="h5" color="white" gutterBottom>
                    Checkout
                </Typography>
            </Grid>
            <Grid size={{ sm: 6 }} display="flex" justifyContent="flex-end">
                <Link to='/profile'>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: 'secondary.light', color: 'white', '&:hover': { backgroundColor: 'secondary.main' } }}>
                        Edit Profile
                    </Button>
                </Link>
            </Grid>
        </Grid>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} mt={2}>
            {Object.entries(user).map(([key, value]) => (
              key !== "address" && (
                <Grid size={{ xs: 12, sm: 6 }} key={key}>
                  <TextField
                    fullWidth
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={value}
                    disabled
                    color="primary"
                    sx={{
                        "& .MuiOutlinedInput-input.Mui-disabled": {
                            WebkitTextFillColor: "white",
                        },
                        "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                        "& .MuiInputLabel-root.Mui-disabled": {
                            color: "white", 
                        },
                    }}
                  />
                </Grid>
              )
            ))}
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Shipping Address"
                value={shippingAddress}
                onChange={handleAddressChange}
                fullWidth
                color="primary"
                sx={{
                    
                  "& .MuiOutlinedInput-input": {
                    backgroundColor: "white",
                    borderRadius: "5px",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    backgroundColor: '#FF5733',
                    borderRadius: "4px"
                  },
                  "& .MuiInputLabel-outlined": {
                    transform: "translate(9px, -8px) scale(0.75)",
                    padding: "0 7px",
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ backgroundColor: 'secondary.light', color: 'white', '&:hover': { backgroundColor: 'secondary.main' } }}
                fullWidth>
                    Place Order
                </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 4, borderRadius: 2 }}>
          <Typography variant="h6" color="#FF5733">Purchase Successful!</Typography>
          <Typography color="black">Your order has been placed successfully.</Typography>
          <Button onClick={handleCloseModalAndRedirect} sx={{ mt: 2 }} variant="contained">Close</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Checkout;
