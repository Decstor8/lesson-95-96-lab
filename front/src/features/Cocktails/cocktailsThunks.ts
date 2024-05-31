import axiosApi from '../../axiosApi';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {CocktailTypes, NewCocktails} from '../../types';

export const getCocktails = createAsyncThunk<CocktailTypes[]>(
    'cocktails/get',
    async () => {
        const response = await axiosApi.get<CocktailTypes[]>('/cocktails');
        const items = response.data;

        if (!items) {
            return [];
        }

        return items;
    },
);

export const getMyCocktails = createAsyncThunk<CocktailTypes[], string>(
    'myCocktails/get',
    async (id) => {
        const response = await axiosApi.get<CocktailTypes[]>(`/cocktails/userCocktails?user=${id}`);
        const items = response.data;

        if (!items) {
            return [];
        }

        return items;
    },
);

export const publishCocktail = createAsyncThunk<void, string>(
    'publish/cocktail',
    async (id) => {
        try {
            await axiosApi.patch('/cocktails/' + id + '/togglePublished');
        } catch (err) {
            throw err;
        }
    },
);

export const deleteCocktail = createAsyncThunk<void, string>(
    'delete/cocktail',
    async (id) => {
        try {
            await axiosApi.delete('/cocktails/' + id);
        } catch (err) {
            throw err;
        }
    },
);

export const addArtists = createAsyncThunk<void, NewCocktails>(
    'add/artists',
    async (data) => {
        try {
            const formData = new FormData();

            formData.append('name', data.name);
            formData.append('recipe', data.recipe);
            formData.append('ingredients', JSON.stringify(data.ingredients));

            if (data.image) {
                formData.append('image', data.image);
            }

            await axiosApi.post('/cocktails', formData);
        } catch (err) {
            throw err;
        }
    },
);