import {configureStore} from '@reduxjs/toolkit';
import attendanceReducer from './attendanceSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
export interface RootState {
  attendance: {
    name: string;
    attendance: any[];
  };
}

const persistedReducer = persistReducer(persistConfig, attendanceReducer);
const store = configureStore({
  reducer: {
    attendance: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

// clearing persisted state after a day
setTimeout(() => {
  persistor.purge();
}, 24 * 60 * 60 * 1000); // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

export {store, persistor};
