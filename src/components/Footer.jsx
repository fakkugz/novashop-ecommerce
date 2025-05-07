import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import GitHubIcon from '@mui/icons-material/GitHub';


const Footer = () => {
  return (
    <Box sx={{ backgroundColor: 'inherit', color: 'white', py: 2, mt: 5, mb: 0 }}>
        
        <Divider sx={{ borderColor: 'white', mb: 2, opacity: '0.4' }} />

        <Container maxWidth="lg">

            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap', gap: 1, mb: 3, opacity: '0.8' }}>
            {[
                'Trabajá con nosotros',
                'Términos y condiciones',
                'Promociones',
                'Cómo cuidamos tu privacidad',
                'Accesibilidad',
                'Información al usuario financiero',
                'Ayuda',
                'Defensa del Consumidor',
                'Información sobre seguros',
                'Libro de quejas online',
            ].map((text) => (
                <Link
                key={text}
                href="#"
                sx={{
                    color: 'white',
                    textDecoration: 'none',
                    mr: 4,
                    fontSize: '0.875rem',
                    '&:hover': {
                    color: 'secondary.main',
                    },
                }}
                >
                    {text}
                </Link>
            ))}
            </Box>

            <Typography variant="body2" align="center" sx={{ mb: 2, opacity: '0.8' }}>
                Copyrigth &copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.
            </Typography>
            <Typography variant="body2" align="center" sx={{ fontSize: '0.75rem', pb: 0 }}>
                Desarrollado por Facundo González
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton
                    component={Link}
                    href="https://github.com/fakkugz"
                    target="_blank"
                    sx={{
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 0.3,
                    '&:hover': {
                    color: 'primary.main',
                    },
                    }}
                >
                    <GitHubIcon />
                    <Typography>
                        /fakkugz
                    </Typography>
                </IconButton>
            </Box>
        </Container>
    </Box>
  );
};

export default Footer;
