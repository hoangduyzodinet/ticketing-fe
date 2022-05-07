import { IUserProfile } from '@/models/user.interface';
import { IBankPayload } from '@/models/bank.interface';
import { IPayload } from '@/models/jwtPayload.interface';
import axiosClient from './axios-client';

export const userApi = {
  findBankByUserId(id: string): Promise<IBankPayload> {
    return axiosClient.get(`/payment/bank/${id}`);
  },

  createBank(payload: IBankPayload) {
    const token = localStorage.getItem('token');

    return axiosClient.post('/payment/bank', payload, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  },

  getUser(token: string): Promise<IPayload> {
    return axiosClient.get('/users/profile', {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  },

  updateUser(payload: IUserProfile): Promise<IUserProfile> {
    const token = localStorage.getItem('token');
    return axiosClient.patch('/users', payload, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  },

  getAllUser(token: string): Promise<IUserProfile[]> {
    return axiosClient.get('/users', {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  },

  getUserByAdmin(id: string): Promise<IUserProfile> {
    const token = localStorage.getItem('token');
    return axiosClient.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  },

  patchUserByAdmin(id: string, payload: IUserProfile) {
    const token = localStorage.getItem('token');
    return axiosClient.patch(`/users/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
