import { IJwtPayload } from '@/models/jwtPayload.interface';
import { ISignupPayload } from '../models/sigup.interface';
import axiosClient from './axios-client';
import { ILoginPayload } from '@/models/auth.interface';

export const authApi = {
  signup(payload: ISignupPayload) {
    return axiosClient.post('/users/signup', payload);
  },

  login(payload: ILoginPayload): Promise<IJwtPayload> {
    return axiosClient.post('/auth/login', payload);
  },

  loginFacebook(accessToken: string) {
    return axiosClient.get(`auth/facebook?access_token=${accessToken}`);
  },
};
