import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { contactReducer, ContactSliceInitialState } from './contact-slice';

interface StoreStateType {
  contact: ContactSliceInitialState;
}

const rootPersistConfig = {
  key: 'kodeit',
  storage,
};

const contactPersistConfig = {
  key: 'taiyo-assignment-contact',
  storage,
};

const rootReducer = combineReducers({
  contact: persistReducer(contactPersistConfig, contactReducer),
});

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
});

const persistor = persistStore(store);

export default store;
export { persistor };
export type RootDispatch = ReturnType<typeof store.dispatch>;
export type { StoreStateType };
