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