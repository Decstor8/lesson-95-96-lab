import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {selectUser} from '../Users/usersSlice';
import {useEffect} from 'react';
import {getMyCocktails} from './cocktailsThunks';
import {selectMyCocktails, selectMyIsLoading} from './cocktailsSlice';
import {Card, CardContent, CardMedia, CircularProgress, Grid, styled, Typography} from '@mui/material';
import {apiUrl} from '../../constant';

const MyCocktails = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const myCocktails = useAppSelector(selectMyCocktails);
    const isLoading = useAppSelector(selectMyIsLoading);

    useEffect(() => {
        const fetchUrl = async () => {
            if (user) await dispatch(getMyCocktails(user._id));

        };

        void fetchUrl();
    }, [dispatch]);

    const ImageCardMedia = styled(CardMedia)({
        height: 0,
        paddingTop: '56.25%',
    });

    return (
        <>
            <Grid container spacing={3}>
                {!isLoading ? myCocktails.map((elem) => (
                    <Grid item xs={6} key={elem._id}>
                        <Card>
                            {elem.image ? <ImageCardMedia image={`${apiUrl}/${elem.image}`}/> : ''}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {elem.name}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    {elem.ingredients.map((ingredient) => (
                                        <Grid key={ingredient._id}>
                                            <Typography component="div">
                                                {`name: ${ingredient.ingredientName}, quantity: ${ingredient.quantity}`}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    Recipe: {elem.recipe}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    Статус: {!elem.isPublished ? 'ваш коктейль на проверке' : 'опубликовано'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )) : <CircularProgress />}
            </Grid>
        </>
    );
};

export default MyCocktails;