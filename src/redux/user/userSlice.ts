import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserProfile } from "../../interfaces";
import { RootState } from "../store";

const initialState: IUserProfile = {
    id: "",
    email: "",
    name: "",
    role: "",
    gender: "",
    birthday: null,
    numberPhone: "",
    avatar: "",
    isLoggedIn: false,
    isBankAccount: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUserProfile>) => {
            (state.id = action.payload.id),
                (state.email = action.payload.email),
                (state.name = action.payload.name),
                (state.role = action.payload.role),
                (state.isLoggedIn = true);
        },
        logout: (state: IUserProfile) => {
            (state.email = ""),
                (state.id = ""),
                (state.name = ""),
                (state.role = ""),
                (state.gender = ""),
                (state.birthday = null),
                (state.numberPhone = ""),
                (state.avatar = ""),
                (state.isLoggedIn = false),
                (state.isBankAccount = false);
        },

        updateIsBank: (
            state: IUserProfile,
            action: PayloadAction<{ isBankAccount: boolean }>,
        ) => {
            state.isBankAccount = action.payload.isBankAccount;
        },

        autoLogin: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
});

export const { login, logout, updateIsBank, autoLogin } = userSlice.actions;

export const selectorUser = (state: RootState) => state.user;

export default userSlice.reducer;
