import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface IUserState {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  gender?: string;
  birthday?: string;
  numberPhone?: string;
  avatar?: string;
  isLoggedIn?: boolean;
  isBankAccount?: boolean;
}

const initialState: IUserState = {
  id: '',
  email: '',
  name: '',
  role: '',
  gender: '',
  birthday: '',
  numberPhone: '',
  avatar: '',
  isLoggedIn: false,
  isBankAccount: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserState>) => {
      (state.id = action.payload.id),
        (state.email = action.payload.email),
        (state.name = action.payload.name),
        (state.role = action.payload.role),
        (state.isLoggedIn = true);
    },
    logout: (state: IUserState) => {
      (state.email = ''),
        (state.id = ''),
        (state.name = ''),
        (state.role = ''),
        (state.gender = ''),
        (state.birthday = ''),
        (state.numberPhone = ''),
        (state.avatar = ''),
        (state.isLoggedIn = false),
        (state.isBankAccount = false);
    },

    updateIsBank: (state: IUserState, action: PayloadAction<{ isBankAccount: boolean }>) => {
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
