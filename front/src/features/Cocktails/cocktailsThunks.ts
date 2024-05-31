import axiosApi from '../../axiosApi';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {CocktailTypes} from '../../types';

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