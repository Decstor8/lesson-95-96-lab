import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { selectCocktails, selectIsLoading } from './cocktailsSlice';
import { useEffect } from 'react';
import { deleteCocktail, getCocktails, publishCocktail } from './cocktailsThunks';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    Typography,
    Box
} from '@mui/material';
import { selectUser } from '../Users/usersSlice';
import { apiUrl } from '../../constant';

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
    const isLoading = useAppSelector(selectIsLoading);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        const fetchUrl = async () => {
            await dispatch(getCocktails());
        };

        void fetchUrl();
    }, [dispatch]);

    const deleteOneCocktail = async (id: string) => {
        await dispatch(deleteCocktail(id));
        await dispatch(getCocktails());
    };

    const publish = async (id: string) => {
        await dispatch(publishCocktail(id));
        await dispatch(getCocktails());
    };

    return (
        <Box sx={{ backgroundColor: '#e0f7fa', padding: 3 }}>
            <Grid container spacing={4}>
                {!isLoading ? cocktails.map((elem) => (
                    <Grid item xs={12} sm={6} md={4} key={elem._id}>
                        {user && user.role === 'admin' ? (
                            <Card sx={{ backgroundColor: '#ffffff', boxShadow: 3 }}>
                                {elem.image && (
                                    <CardMedia
                                        component="img"
                                        image={`${apiUrl}/${elem.image}`}
                                        alt={elem.name}
                                        sx={{ height: 200 }}
                                    />
                                )}
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div" color="primary">
                                        {elem.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {elem.ingredients.map((ingredient) => (
                                            <Box key={ingredient._id} sx={{ marginBottom: 1 }}>
                                                <Typography>
                                                    {`Name: ${ingredient.ingredientName}, Quantity: ${ingredient.quantity}`}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Typography>
                                    <Typography variant="body2">
                                        Recipe: {elem.recipe}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Статус: {!elem.isPublished ? 'Не опубликовано' : 'Опубликовано'}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                                    <Button color="error" onClick={() => deleteOneCocktail(elem._id)}>
                                        Удалить
                                    </Button>
                                    <Button onClick={() => publish(elem._id)}>
                                        {elem.isPublished ? 'Снять с публикации' : 'Опубликовать'}
                                    </Button>
                                </Box>
                            </Card>
                        ) : elem.isPublished ? (
                            <Card sx={{ backgroundColor: '#ffffff', boxShadow: 3 }}>
                                {elem.image && (
                                    <CardMedia
                                        component="img"
                                        image={`${apiUrl}/${elem.image}`}
                                        alt={elem.name}
                                        sx={{ height: 200 }}
                                    />
                                )}
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div" color="primary">
                                        {elem.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {elem.ingredients.map((ingredient) => (
                                            <Box key={ingredient._id} sx={{ marginBottom: 1 }}>
                                                <Typography>
                                                    {`Name: ${ingredient.ingredientName}, Quantity: ${ingredient.quantity}`}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Typography>
                                    <Typography variant="body2">
                                        Recipe: {elem.recipe}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ) : null}
                    </Grid>
                )) : <CircularProgress />}
            </Grid>
        </Box>
    );
};

export default Cocktails;
