
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'; 
import storage from 'redux-persist/lib/storage';
import rootReducer from './Redux/rootReducer';

const persistConfig = {
    key: 'root',
    storage: storage, 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }),
});

const persistor = persistStore(store);

export { store, persistor };

