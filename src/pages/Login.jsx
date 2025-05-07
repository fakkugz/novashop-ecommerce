import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import Person from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const { login, error, setError } = useContext(AuthContext);
    const [email, setEmail] = useState('johndoe123@novashop.com');
    const [password, setPassword] = useState('password123');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        if (localStorage.getItem("isAuthenticated") === "true") {
            navigate("/shop");
        }
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        if (error) setError(false);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        if (error) setError(false);
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "350px",
                    bgcolor: "primary.main",
                    borderRadius: '10px',
                    py: 6,
                    my: 9
                }}
            >

                <IconButton
                    sx={{
                        backgroundColor: 'white',
                        width: 60,
                        height: 60,
                        mb: 2,
                        borderRadius: '50%',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: '#FF4511',
                        },
                        '&:hover svg': {
                            color: 'white',
                        }
                    }}
                >
                    <Person sx={{ fontSize: 40, color: 'primary.main' }} />
                </IconButton>

                <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} width={300}>
                    <TextField
                        fullWidth
                        value={email}
                        onChange={handleChangeEmail}
                        error={error}
                        placeholder="johndoe123@novashop.com"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle sx={{ color: error ? "red" : "gray.900" }} />
                                    </InputAdornment>
                                )
                            }
                        }}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" },
                                "& input": { color: "black" }
                            }
                        }}
                    />

                    <TextField
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        value={password}
                        onChange={handleChangePassword}
                        error={error}
                        placeholder="password123"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{ color: error ? "red" : "gray.900" }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" },
                                "& input": { color: "black" }
                            }
                        }}
                    />


                    {error && <Typography
                        sx={{
                            color: "error.main",
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            padding: "4px 8px",
                            borderRadius: "5px",
                            textAlign: "center",
                            fontWeight: '900'
                        }}
                    >
                        Invalid credentials
                    </Typography>}

                    <Box
                        sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', width: "100%" }}>
                        <FormControlLabel
                            control={<Checkbox
                                sx={{
                                    color: "white",
                                    width: 24,
                                    height: 24,
                                    px: 2.5,
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 24,
                                    },
                                    '&.Mui-checked': {
                                        color: '#FF4511',
                                    },
                                    '&.Mui-checked .MuiSvgIcon-root': {
                                        border: '1px solid #FF5733',
                                        borderRadius: '3px',
                                    }
                                }}
                            />}
                            label={<Typography color="white">
                                Remember Me
                            </Typography>}
                        />
                        <Typography sx={{ color: "white", cursor: "pointer", fontStyle: 'italic' }}>
                            Forgot Password?
                        </Typography>
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: 'secondary.light', color: 'white', '&:hover': { backgroundColor: 'secondary.main' } }}
                        fullWidth
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
