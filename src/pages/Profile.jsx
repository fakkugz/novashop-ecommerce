import { useContext, useState } from "react";
import { TextField, Button, Container, Typography, Paper,
        Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Grid } from '@mui/material';
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { user, setUser } = useContext(AuthContext);

  const [errors, setErrors] = useState({});


  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
      case "lastname":
      case "city":
      case "state":
      case "country":
        if (!/^[A-Za-zÀ-ÿ\s]+$/.test(value)) {
          error = "Solo letras permitidas";
        }
        break;
      case "email":
        if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/.test(value)) {
          error = "Correo inválido";
        }
        break;
      case "phone":
        if (!/^\d{3}[-]?\d{3}[-]?\d{4}$/.test(value)) {
          error = "Debe ser un teléfono válido (Ej. 123-456-7890)";
        }
        break;
      case "address":
        if (!/^[A-Za-z0-9À-ÿ\s,.-]+$/.test(value)) {
          error = "Caracteres inválidos";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSave = () => {
    
    if (Object.values(errors).some(error => error !== "")) {
      alert("Corrige los errores antes de guardar.");
      return;
    }
    setIsEditing(false);
    setDialogOpen(true);
  };

  const toggleEdit = () => {
    
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(!isEditing);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, mt: 5, bgcolor: 'primary.main' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid size={{ sm: 6 }}>
            <Typography variant="h5" color="white" gutterBottom>
              Profile
            </Typography>
          </Grid>
          <Grid size={{ sm: 6 }} display="flex" justifyContent="flex-end">
            <Button
                variant="contained"
                sx={{ backgroundColor: 'secondary.light', color: 'white', '&:hover': { backgroundColor: 'secondary.main' } }}
                onClick={toggleEdit}>
              {isEditing ? "Save" : "Edit Profile"}
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2}>
          {Object.entries(user).map(([key, value]) => (
            <Grid size={{ xs: 12, sm: 6 }} key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={value}
                onChange={handleChange}
                disabled={!isEditing}
                error={!!errors[key]}
                helperText={errors[key] || ""}
                slotProps={{
                    input: {
                        style: {
                          backgroundColor: isEditing ? "white" : "inherit",
                          WebkitTextFillColor: !isEditing ? "#424242" : "inherit"
                        },
                        ...(key === "phone" && { maxLength: 12, inputMode: "numeric", pattern: "[0-9]*" })
                    },
                formHelperText: { component: "span" }
                  }}
                color="primary"
                sx={{
                    "& .MuiOutlinedInput-input": {
                        backgroundColor: isEditing ? "white" : "inherit",
                        borderRadius: '5px'
                    },
                    "& .MuiOutlinedInput-input.Mui-disabled": {
                      WebkitTextFillColor: "white", 
                    },
                    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white", 
                    },
                    "& .MuiInputLabel-root": {
                        color: "white",
                        backgroundColor: isEditing ? '#FF5733' : 'inherit',
                        borderRadius: "4px"
                    },
                    "& .MuiInputLabel-root.Mui-disabled": {
                        color: "white", 
                        },
                    "& .MuiInputLabel-outlined": {
                        transform: "translate(9px, -8px) scale(0.75)",
                        padding: "0 7px",
                    },
                    "& .MuiOutlinedInput-notchedOutline legend": {
                        width: "auto !important",
                    },
                    "& .MuiFormHelperText-root": {
                        color: "white",
                        bgcolor: 'rgb(255, 0, 0)',
                        maxWidth: "max-content",
                        padding: "2px 6px",
                        borderRadius: "4px" 
                        
                    }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Dialog open={dialogOpen}>
        <DialogTitle color='#FF5733' >Message</DialogTitle>
        <DialogContent>
          <Typography>Data saved successfully</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
