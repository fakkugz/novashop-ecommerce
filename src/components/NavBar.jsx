import { useContext, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Person from '@mui/icons-material/Person';

import { Link, useNavigate } from 'react-router-dom';

import { ShopContext } from '../contexts/ShopContext';
import { AuthContext } from '../contexts/AuthContext';

import NLogo from '../assets/NLogo.png';



const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { cart } = useContext(ShopContext);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const pages = ['Home', 'Shop', 'Categories'];
  const settings = [
    { label: "Profile", path: isAuthenticated ? "/profile" : '/login' },
    { label: "History", path: isAuthenticated ? "/history" : '/login' },
    {
      label: isAuthenticated ? "Logout" : "Login",
      action: isAuthenticated ? () => setOpenDialog(true) : () => navigate("/login"),
    },
  ];

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    setOpenDialog(false);
    navigate('/shop');
  };

  return (
    <AppBar position="sticky" sx={{ zIndex: 2, boxShadow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ px: { xs: 0, sm: 3 }, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Link to='/home' style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, alignItems: 'center' }}>
                <img
                  src={NLogo}
                  alt="NovaShop Logo"
                  height="35"
                  style={{ display: 'block' }}
                />
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="p"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'montserrat underline',
                  fontWeight: 500,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                NovaShop
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 3 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'flex' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} sx={{ p: 0 }}>
                  <Link to={`/${page.toLowerCase()}`}>
                    <Typography
                      sx={{
                        textAlign: 'center', minWidth: '120px', padding: '8px 16px', textDecoration: 'none', color: 'black',
                        '&:hover': {
                          display: 'inline-block',
                          backgroundColor: 'primary.main',
                          color: 'white',
                          padding: '8px 16px',
                        }
                      }}
                    >
                      {page}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to='/home' style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, alignItems: 'center' }}>
              <img src={NLogo} alt="NovaShop Logo" style={{ height: '35px' }} />
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="p"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'montserrat underline',
                fontWeight: 500,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              NovaShop
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 8, mr: 6 }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                sx={{
                  color: 'white',
                  fontFamily: 'Montserrat, sans-serif',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px 16px',
                  fontSize: '1rem',
                  transition: 'transform 0.2s ease-in-out, font-size 0.2s ease-in-out, color 0.2s ease-in-out',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: '50%',
                    bottom: '0px',
                    width: '80%',
                    height: '2px',
                    backgroundColor: '#FF5733',
                    transform: 'translateX(-50%) scaleX(0)',
                    transition: 'transform 0.3s ease-in-out'
                  },
                  '&:hover': {
                    transform: 'scale(1.1)',
                    color: 'white'
                  },
                  '&:hover::after': {
                    transform: 'translateX(-50%) scaleX(1)'
                  }
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User Avatar"
                    src={isAuthenticated ? "" : undefined}
                    sx={{
                      bgcolor: isAuthenticated ? "white" : "secondary.light",
                      color: isAuthenticated ? "primary.main" : "white",
                      width: 40,
                      height: 40,
                      fontSize: 18,
                      fontWeight: "bold"
                    }}
                  >
                    {isAuthenticated ? "JD" : <Person sx={{ fontSize: 28 }} />}
                  </Avatar>
                </IconButton>

              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                slotProps={{
                  paper: {
                    sx: {
                      width: '120px',
                      maxWidth: '150px',
                    },
                  },
                }}
              >
                {settings.map(({ label, path, action }) => (
                  <MenuItem
                    key={label}
                    onClick={() => {
                      handleCloseUserMenu();
                      action ? action() : navigate(path);
                    }}
                    sx={{ p: 0 }}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        padding: "8px 16px",
                        minWidth: "100%",
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                        },
                      }}
                    >
                      {label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Link to='/cart'>
              <IconButton aria-label="cart" sx={{ '&:focus': { outline: 'none', } }}>
                <Badge
                  badgeContent={cart.reduce((total, item) => total + item.quantity, 0)}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: 'secondary.main',
                      color: 'white',
                    },
                  }}
                >
                  <ShoppingCartIcon sx={{ color: 'white' }} />
                </Badge>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </Container>
      {/* Modal de confirmación de cierre de sesión */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: "#FF5733" }}>
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default NavBar;
