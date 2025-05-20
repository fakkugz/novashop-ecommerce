import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

import { useLocation } from 'react-router-dom';
import { setActiveFilters, setShowOnlyFavorites, setPriceFilter, setRateFilter, setMin, setMax, setRateRange } from '../features/filtersSlice';
import { useSelector, useDispatch } from 'react-redux';


const FiltersDrawer = () => {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const categories = useSelector(state => state.products.categories);
    const { activeFilters, priceFilter, rateFilter,
        min, max, rateRange, showOnlyFavorites } = useSelector(state => state.filters);

    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const categoryParam = searchParams.get("category");

        if (categoryParam) {
            const categoriesFromUrl = categoryParam.split(",");
            const updatedFilters =
                JSON.stringify(activeFilters) === JSON.stringify(categoriesFromUrl)
                    ? activeFilters
                    : categoriesFromUrl;

            dispatch(setActiveFilters(updatedFilters));
        } else {
            const resetFilters = activeFilters.length === 0 ? activeFilters : [];
            dispatch(setActiveFilters(resetFilters));
        }
    }, [dispatch, location.search]);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleToggleCheck = (cat) => {
        const updatedFilters = activeFilters.includes(cat) ? activeFilters.filter(c => c !== cat) : [...activeFilters, cat];
        dispatch(setActiveFilters((updatedFilters)));
    };

    const handleApply = () => {
        const minValue = min === '' ? 0 : Number(min);
        const maxValue = max === '' ? Infinity : Number(max);
        dispatch(setPriceFilter({ min: minValue, max: maxValue }));
    };

    const handleRateChange = (event, newValue) => {
        dispatch(setRateRange(newValue));
        dispatch(setRateFilter({
            min: newValue[0],
            max: newValue[1]
        }));
    };

    const handleResetFilters = () => {
        dispatch(setMin(''));
        dispatch(setMax(''));
        dispatch(setRateRange([1, 5]));
        dispatch(setActiveFilters([]));
        dispatch(setPriceFilter({ min: 0, max: Infinity }));
        dispatch(setRateFilter({ min: 1, max: 5 }));
        dispatch(setShowOnlyFavorites(false));
    };


    return (
        <Box
            sx={{
                backgroundColor: '#1b1b1b',
                color: 'white',
                height: 'auto',
                p: { xs: 1, sm: 2 },
                borderRadius: '5px',
                minHeight: { xs: '100%', sm: 'auto' }
            }}
        >
            <Typography variant="h5" gutterBottom sx={{ ml: 1 }}>
                Filters
            </Typography>

            <Stack
                direction="column"
                divider={<Divider orientation="horizontal" flexItem sx={{ bgcolor: 'grey.500' }} />}
                spacing={2}
                sx={{ mb: 1 }}
            >
                {
                    priceFilter.min === 0 && priceFilter.max === Infinity ?
                        null : <Box sx={{
                            bgcolor: '#efefef',
                            color: 'black',
                            width: 'fit-content',
                            padding: '0 5px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            De ${priceFilter.min} a ${priceFilter.max}
                            <IconButton sx={{ padding: '0' }} onClick={() => dispatch(setPriceFilter({ min: 0, max: Infinity }))}>
                                <CloseIcon sx={{ fontSize: 16, color: 'gray' }} />
                            </IconButton>
                        </Box>
                }
                <Box sx={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {
                        activeFilters.length > 0 ?
                            activeFilters.map(cat =>
                                <Box sx={{
                                    bgcolor: '#efefef',
                                    color: 'black',
                                    width: 'fit-content',
                                    padding: '0 5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '3px'
                                }} key={cat}>
                                    {cat}
                                    <IconButton sx={{ padding: '0' }}
                                        onClick={() => dispatch(setActiveFilters(activeFilters.filter(c => c !== cat)))}>
                                        <CloseIcon sx={{ fontSize: 16, color: 'gray' }} />
                                    </IconButton>
                                </Box>
                            ) : null
                    }
                </Box>
                {
                    rateFilter.min === 1 && rateFilter.max === 5 ?
                        null : <Box sx={{
                            bgcolor: '#efefef',
                            color: 'black',
                            width: 'fit-content',
                            padding: '0 5px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            Rate: {rateFilter.min} a {rateFilter.max}
                            <IconButton sx={{ padding: '0' }} onClick={() => dispatch(setRateFilter({ min: 1, max: 5 }))}>
                                <CloseIcon sx={{ fontSize: 16, color: 'gray' }} />
                            </IconButton>
                        </Box>
                }
            </Stack>

            <Divider sx={{ mb: 2, bgcolor: 'grey.500' }} />
            <List>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pl: 2, mb: 2 }}>
                    <FavoriteIcon sx={{ color: showOnlyFavorites ? 'secondary.main' : 'white', mr: 1, transition: 'all 0.3s ease-in-out', }} />
                    <Typography>Only Favorites</Typography>
                    <Switch
                        checked={showOnlyFavorites}
                        onChange={() => dispatch(setShowOnlyFavorites(!showOnlyFavorites))}
                    />
                </Box>
                <ListItem>
                    <ListItemIcon sx={{ minWidth: '44px' }} >
                        <AttachMoneyIcon sx={{ color: min || max ? 'secondary.main' : 'white', transition: 'all 0.3s ease-in-out', }} />
                    </ListItemIcon>
                    <ListItemText primary="Price" />
                </ListItem>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, paddingLeft: 1, marginBottom: '1.5rem', maxWidth: '93%' }}>
                    <TextField
                        label="Min"
                        type="number"
                        size="small"
                        value={min}
                        onChange={(e) => dispatch(setMin(e.target.value))}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                padding: '2px',
                                '& input': {
                                    padding: '6px 8px',
                                },
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                                fontSize: '0.875rem',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                                fontSize: '0.8rem',
                            },
                        }}
                    />

                    <TextField
                        label="Max"
                        type="number"
                        size="small"
                        value={max}
                        onChange={(e) => dispatch(setMax(e.target.value))}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                padding: '2px',
                                '& input': {
                                    padding: '6px 6px',
                                },
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                                fontSize: '0.875rem',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                                fontSize: '0.8rem',
                            },
                        }}
                    />
                    <Button variant="contained" onClick={handleApply}
                        sx={{ borderRadius: '50%', padding: '0', minWidth: '30px', height: '30px' }} >
                        <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                    </Button>
                </Box>

                <ListItemButton onClick={handleClick}>
                    <ListItemIcon sx={{ minWidth: '44px' }}>
                        <CategoryIcon sx={{ color: activeFilters.length > 0 ? 'secondary.main' : 'white', transition: 'all 0.3s ease-in-out', }} />
                    </ListItemIcon>
                    <ListItemText primary="Category" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {categories.length > 0 ? (
                            categories.map(cat =>
                                <ListItemButton key={cat} sx={{ pl: 4, display: 'flex', alignItems: 'center' }}>
                                    <ListItemIcon sx={{ minWidth: 0.25 }}>
                                        <Switch
                                            checked={activeFilters.includes(cat)}
                                            onChange={() => handleToggleCheck(cat)}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={cat.charAt(0).toUpperCase() + cat.slice(1)} sx={{ textAlign: 'left' }} />
                                </ListItemButton>
                            )
                        ) : (<ListItemText primary="No categories" />)
                        }
                    </List>
                </Collapse>

                <ListItem sx={{ marginTop: '2rem' }} >
                    <ListItemIcon sx={{ minWidth: '44px' }}>
                        <StarIcon sx={{ color: rateRange[0] === 1 && rateRange[1] === 5 ? 'white' : 'secondary.main', transition: 'all 0.3s ease-in-out', }} />
                    </ListItemIcon>
                    <ListItemText primary="Rate" />
                </ListItem>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '85%',
                        paddingLeft: 5,
                        backgroundColor: '#1b1b1b'
                    }}
                >
                    <Slider
                        value={rateRange}
                        onChange={handleRateChange}
                        valueLabelDisplay="auto"
                        step={0.1}
                        min={1}
                        max={5}
                    />
                    <Typography variant="body2">
                        Min: {rateRange[0]} - Max: {rateRange[1]}
                    </Typography>
                </Box>
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="outlined"
                    color="white"
                    onClick={handleResetFilters}
                    sx={{
                        mt: 3, mb: 3, width: '85%',
                        '&:hover': {
                            borderColor: 'primary.main',
                        },
                    }}
                >
                    Clean Filters
                </Button>
            </Box>
        </Box>
    );
};

export default FiltersDrawer;
