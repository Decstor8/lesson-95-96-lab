import {CocktailTypes} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {getCocktails} from './cocktailsThunks';
import {RootState} from '../../App/store';

interface Cocktails {
    cocktails: CocktailTypes[];
    isLoading: boolean;
}

const initialState: Cocktails = {
    cocktails: [],
    isLoading: false,
};

export const cocktailsSlice = createSlice({
    name: 'cocktails/slice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCocktails.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCocktails.fulfilled, (state, {payload: items}) => {
            state.isLoading = false;
            state.cocktails = items;
        });
        builder.addCase(getCocktails.rejected, (state) => {
            state.isLoading = false;
        });
    },
});
export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectIsLoading = (state: RootState) => state.cocktails.isLoading;