import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface IOrderState {
  id?: string;
}

const initialState: IOrderState = {
  id: '',
};

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<IOrderState | undefined>) => {
      state.id = action.payload?.id;
    },
  },
});

export const { createOrder } = OrderSlice.actions;
export const selectorOrder = (state: RootState) => state.order;
export default OrderSlice.reducer;
