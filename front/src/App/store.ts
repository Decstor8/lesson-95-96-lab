import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {usersReducer} from '../features/Users/usersSlice';
import {cocktailsReducer} from '../features/Cocktails/cocktailsSlice';

const usersPersist = {
    key: 'music:users',
    storage: storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    users: persistReducer(usersPersist, usersReducer),
    cocktails: cocktailsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER]
        }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;