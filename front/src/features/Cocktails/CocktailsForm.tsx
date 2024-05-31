import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../App/hooks';
import { useNavigate } from 'react-router-dom';
import { NewCocktails } from '../../types';
import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import FileInput from '../../components/inputFule';
import { addArtists } from './cocktailsThunks';

const CocktailForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<NewCocktails>({
        name: '',
        image: null,
        recipe: '',
        ingredients: [{
            ingredientName: '',
            quantity: '',
        }],
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(addArtists(formData));
        };
        void fetchData();
    }, [dispatch, formData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        if (files) {
            setFormData(prevData => ({ ...prevData, [name]: files[0] }));
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        navigate('/');
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Добавить коктейль
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Название"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Рецепт"
                                name="recipe"
                                value={formData.recipe}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        {formData.ingredients.map((ingredient, index) => (
                            <Grid item xs={12} key={index}>
                                <TextField
                                    label="Ингредиент"
                                    name={`ingredientName-${index}`}
                                    value={ingredient.ingredientName}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    label="Количество"
                                    name={`quantity-${index}`}
                                    value={ingredient.quantity}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <FileInput
                                label="Изображение"
                                name="image"
                                onChange={handleFileChange}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                        Создать коктейль
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CocktailForm;
