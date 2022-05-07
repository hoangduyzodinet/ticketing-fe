import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import eventReducer from './event/eventSlice';
import orderReducer from './order/orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
