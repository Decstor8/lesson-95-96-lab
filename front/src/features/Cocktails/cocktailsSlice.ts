import {CocktailTypes} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {getCocktails, getMyCocktails} from './cocktailsThunks';
import {RootState} from '../../App/store';

interface Cocktails {
    cocktails: CocktailTypes[];
    isLoading: boolean;
    myCocktails: CocktailTypes[]
    myIsLoading: boolean;
}

const initialState: Cocktails = {
    cocktails: [],
    isLoading: false,
    myCocktails: [],
    myIsLoading: false,
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

        builder.addCase(getMyCocktails.pending, (state) => {
            state.myIsLoading = true;
        });
        builder.addCase(getMyCocktails.fulfilled, (state, {payload: items}) => {
            state.myIsLoading = false;
            state.myCocktails = items;
        });
        builder.addCase(getMyCocktails.rejected, (state) => {
            state.myIsLoading = false;
        });
    },
});
export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectIsLoading = (state: RootState) => state.cocktails.isLoading;
export const selectMyCocktails = (state: RootState) => state.cocktails.myCocktails;
export const selectMyIsLoading = (state: RootState) => state.cocktails.myIsLoading;
