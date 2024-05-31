import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { selectCocktails, selectIsLoading } from './cocktailsSlice';
import { useEffect } from 'react';
import { getCocktails } from './cocktailsThunks';
import {
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    Typography,
    Card,
    Box
} from '@mui/material';

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
    const isLoading = useAppSelector(selectIsLoading);

    useEffect(() => {
        const fetchUrl = async () => {
            await dispatch(getCocktails());
        };

        void fetchUrl();
    }, [dispatch]);

    return (
        <Box sx={{ backgroundColor: '#f0f0f0', padding: 3 }}>
            <Grid container spacing={3}>
                {!isLoading ? cocktails.map((elem) => (
                    <Grid item xs={6} key={elem._id}>
                        <Card sx={{ backgroundColor: '#ffffff', boxShadow: 3 }}>
                            {elem.image && (
                                <CardMedia
                                    component="img"
                                    image={`http://localhost:8000/${elem.image}`}
                                    alt={elem.name}
                                    sx={{ height: 200 }}
                                />
                            )}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" color="primary">
                                    {elem.name}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    {elem.ingredients.map((ingredient) => (
                                        <Box key={ingredient._id}>
                                            <Typography component="div" color="textSecondary">
                                                {`name: ${ingredient.ingredientName}, quantity: ${ingredient.quantity}`}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    Recipe: {elem.recipe}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    Статус: {!elem.isPublished ? 'Ожидайте проверки администрации' : 'опубликовано'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )) : <CircularProgress />}
            </Grid>
        </Box>
    );
};

export default Cocktails;
