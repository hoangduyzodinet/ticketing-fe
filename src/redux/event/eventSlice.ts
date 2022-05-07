import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IEventState {
    id?: string;
    isOwner?: boolean;
}

const initialState: IEventState = {
    id: "",
    isOwner: false,
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        isOwner: (state, action: PayloadAction<{ isOwner: boolean }>) => {
            state.isOwner = action.payload.isOwner;
        },
    },
});

export const { isOwner } = eventSlice.actions;
export const selectorEvent = (state: RootState) => state.event;
export default eventSlice.reducer;
